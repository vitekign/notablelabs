import os
import django
# Must include the following two lines; otherwise, the module will crash!
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "notablelabs.settings")
django.setup()

from django.conf import settings  # Import to get access to CONSTS in setting file.
import urllib.request
import tarfile
import csv
import re
from dataprocessing.models import *
from dataprocessing.utils.dataset_to_rel_schema_utils import find_types_of_the_fields

CANCER_DATA_SET_FILE_NAME = "LAML.merged_only_clinical_clin_format.txt"
CANCER_DATA_SET_DOWNLOAD_PATH = "http://gdac.broadinstitute.org/runs/stddata__2016_01_28/data/LAML/20160128/gdac.broadinstitute.org_LAML.Merge_Clinical.Level_1.2016012800.0.0.tar.gz"
CANCER_STUDIES_PATH = os.path.join(settings.BASE_DIR, "datasets", "cancer_studies")
CANCER_DATASET_FOLDER_NAME = CANCER_DATA_SET_DOWNLOAD_PATH.split("/").pop(-1).replace(".tar.gz", "")
CANCER_FILE_PATH = os.path.join(CANCER_STUDIES_PATH, CANCER_DATASET_FOLDER_NAME, CANCER_DATA_SET_FILE_NAME)


def download_dataset(dataset_url=CANCER_DATA_SET_DOWNLOAD_PATH, dataset_path=CANCER_STUDIES_PATH,
                     file_name=CANCER_DATASET_FOLDER_NAME):
    """Download the archive from the Internet, save it and unpack it."""
    try:
        if not os.path.isdir(dataset_path):
            os.makedirs(dataset_path)
    except OSError as err:
        print("Unfortunately, the file could not be created.")
        print(err)
    tgz_path = os.path.join(dataset_path, file_name)
    urllib.request.urlretrieve(dataset_url, tgz_path)
    dataset_tgz = tarfile.open(tgz_path)
    dataset_tgz.extractall(path=dataset_path)
    dataset_tgz.close()


def open_file_and_convert_to_key_value_pairs(file_name=CANCER_FILE_PATH):
    """Fetch the data from the file and convert all data points
    into corresponding patients and their features."""
    features = []
    with open(file_name, encoding="UTF8") as fh:
        for sub_group in csv.reader(fh, delimiter="\t"):
            features.append(sub_group)

    # Get rid of the first set of values [V1...V201]
    features = features[1:]

    features_in_groups = {}
    # First value is a feature name.
    for feature in features:
        features_in_groups[feature[0]] = feature[1:]

    patients = [{} for _ in range(200)]

    for key, values in features_in_groups.items():
        for num, value in enumerate(values):
            patients[num][key] = value

    print(f"The number of patients is: {len(patients):^5}")
    print(f"The number of fields/features in one patient is: {len(patients[0]):^5}")

    return patients


# show_value_of_feature_for_all_patients(patients, 'patient.race_list.race')
def show_values_of_feature_for_all_patients(patients, feature):
    """ Retrieve specified feature from all patients """
    for patient in patients:
        yield patient[feature]


# list(find_nested_features(patients))
def find_nested_features(patients):
    """Find all features which resemble a nested structure.
    For example: admin.patient."""
    for key, _ in patients[0].items():
        match = re.fullmatch(r'.*\..*\..*', key)  # matches strings with 2 or more dots.
        if match is not None:
            yield match.group()


def find_non_nested_features(patients, entity='patient.'):
    for key, _ in patients[0].items():
        match = re.fullmatch(r'.*\..*\..*', key)
        if match is None and entity in key:
            yield key
# list(find_non_nested_features(patients))


def get_list_of_non_nested_properties_for_patient(patients):
    props = []
    for prop in list(find_non_nested_features(patients)):
        props.append(re.sub('^patient\.', '', prop))
    return props


# for datapoint in sorted(find_set_of_unique_nested_features(patients), key=len):
#    print(datapoint)
def find_set_of_unique_nested_features(patients):
    """Find all unique nested features. """
    return set([re.sub(r'-[0-9]+', '', feature) for feature in list(find_nested_features(patients))])


def get_length_of_the_longest_value_in(patients):
    features_len = {}
    for patient in patients:
        for key, value in patient.items():
            if len(str(value)) > features_len.setdefault(key, 0):
                features_len[key] = len(value)
    return max(sorted(features_len.values()))


def get_features(patients):
    """features = list(get_features(patients))"""
    for key, _ in patients[0].items():
        yield(key)


def populate_database():
    LOGGING = False

    patients = open_file_and_convert_to_key_value_pairs()
    patient_non_nested_attrs = set(find_non_nested_features(patients))

    PatientWithdrawal.objects.all().delete()
    RaceList.objects.all().delete()
    Admin.objects.all().delete()
    Patient.objects.all().delete()
    CytogeneticAbnormalities.objects.all().delete()

    field_types = find_types_of_the_fields(patients)

    for one_patient in patients:
        cytogenetic_abnormalities_list = []

        race, new_race_added = RaceList.objects.get_or_create(race=one_patient['patient.race_list.race'])
        withdrawn_value = False if one_patient['admin.patient_withdrawal.withdrawn'] == 'false' else True
        withdrawal, patient_withdrawal_added = PatientWithdrawal.objects.get_or_create(withdrawn=withdrawn_value)
        admin = Admin.objects.create(patient_withdrawal=withdrawal)
        patient = Patient.objects.create(admin=admin, race_list=race)
        for key, value in one_patient.items():
            # patient.race_list.race : white
            if 'race_list.race' in key:
                pass

            # patient.cytogenetic_abnormalities.cytogenetic_abnormality : normal
            elif 'cytogenetic_abnormalities' in key:
                if LOGGING: print('cytogenetic_abnormalities')
                cytogenetic_abnormality, cyt_abn_added = CytogeneticAbnormalities.objects.get_or_create(abnormality=value)
                cytogenetic_abnormalities_list.append(cytogenetic_abnormality)

            elif key in patient_non_nested_attrs and 'molecular_analysis_abnormality_testing_results' not in key:
                if LOGGING: print('patient: {}'.format(key.split('.')[1]))
                if field_types[key] == 'NUMBER_TYPE':
                    if 'NA' not in value:
                        setattr(patient, key.split('.')[1], float(value))
                    else:
                        setattr(patient, key.split('.')[1], None)
                else:
                    setattr(patient, key.split('.')[1], str(value))
            # admin.batch_number : 25.17.0
            elif 'admin.' in key and 'admin.patient_withdrawal.withdrawn' not in key:
                if LOGGING: print('admin: {}'.format(key.split('.')[1]))
                setattr(admin, key.split('.')[1], value)
        race.save()
        admin.save()
        patient.race_list = race
        patient.admin = admin
        patient.save()
        for cytogenetic_abnormality in cytogenetic_abnormalities_list:
            cytogenetic_abnormality.save()
            patient.cytogenetic_abnormalities.add(cytogenetic_abnormality)

    print(">>> data is successfully extracted into DB")


if __name__ == "__main__":
    populate_database()