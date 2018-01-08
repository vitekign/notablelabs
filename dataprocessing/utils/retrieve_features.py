import os
import sys


def include_upper_modules_to_pythonpath(level, p_path):
    if level == 0:
        return
    p_path += f"..{os.path.sep}"
    sys.path.append(p_path) if p_path not in sys.path else _
    level -= 1
    include_upper_modules_to_pythonpath(level, p_path)


include_upper_modules_to_pythonpath(2, "")

import django
# # Must include the following two lines; otherwise, the module will crash!
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

IGNORED_FIELDS = {"patient.fish_test_component_results"}
LOGGING = False


def download_dataset(dataset_url=CANCER_DATA_SET_DOWNLOAD_PATH, dataset_path=CANCER_STUDIES_PATH,
                     file_name=CANCER_DATASET_FOLDER_NAME):
    """Download an archive from the Internet, save and unpack it."""
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


def open_file_and_convert_to_key_value_pairs(file_name=CANCER_FILE_PATH, display=False):
    """Retrieve data from a file and convert all data points
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
        if feature[0] not in IGNORED_FIELDS:
            features_in_groups[feature[0]] = feature[1:]

    patients = [{} for _ in range(200)]

    for key, values in features_in_groups.items():
        for num, value in enumerate(values):
            patients[num][key] = value

    if display:
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
        yield (key)


def extract_number(s):
    match_digits = re.search(r'\d+', s)
    if match_digits:
        return match_digits.group()
    return 0


class FishTestResult:
    fish_test_component = ''
    fish_test_component_percentage_value = ''


class ImmunoCytoResult:
    immunophenotype_cytochemistry_percent_positive = ''
    immunophenotype_cytochemistry_testing_result = ''


class MolecAbnormsResult:
    molecular_analysis_abnormality_testing_percentage_value = ''
    molecular_analysis_abnormality_testing_result = ''


def populate_database():
    patients = open_file_and_convert_to_key_value_pairs()
    patient_non_nested_attrs = set(find_non_nested_features(patients))

    PatientWithdrawal.objects.all().delete()
    RaceList.objects.all().delete()
    Admin.objects.all().delete()
    Patient.objects.all().delete()
    CytogeneticAbnormalities.objects.all().delete()
    FishTestComponentResults.objects.all().delete()
    ImmunophenotypeCytochemistryTestingResults.objects.all().delete()

    field_types = find_types_of_the_fields(patients)

    for one_patient in patients:
        cytogenetic_abnormalities_list = []
        fish_test_dict = {}
        immuno_cyto_dict = {}
        molecul_abnorm_dict = {}

        race, new_race_added = RaceList.objects.get_or_create(race=one_patient['patient.race_list.race'])
        withdrawn_value = False if one_patient['admin.patient_withdrawal.withdrawn'] == 'false' else True
        withdrawal, patient_withdrawal_added = PatientWithdrawal.objects.get_or_create(withdrawn=withdrawn_value)
        admin = Admin.objects.create(patient_withdrawal=withdrawal)
        patient = Patient.objects.create(admin=admin, race_list=race)
        for key, value in one_patient.items():

            if 'molecular_analysis_abnormality_testing_percentage_value' in key:
                molec_abnorm_num = extract_number(key)
                if value == 'NA':
                    molecul_abnorm_dict.setdefault(int(molec_abnorm_num),
                                                   MolecAbnormsResult()).molecular_analysis_abnormality_testing_percentage_value = None
                else:
                    molecul_abnorm_dict.setdefault(int(molec_abnorm_num),
                                                   MolecAbnormsResult()).molecular_analysis_abnormality_testing_percentage_value = float(
                        value)

            elif 'molecular_analysis_abnormality_testing_result' in key:
                molec_abnorm_num = extract_number(key)
                molecul_abnorm_dict.setdefault(int(molec_abnorm_num),
                                               MolecAbnormsResult()).molecular_analysis_abnormality_testing_result = value

            elif 'immunophenotype_cytochemistry_percent_positive' in key:
                immuno_cyt_num = extract_number(key)
                if value == 'NA':
                    immuno_cyto_dict.setdefault(int(immuno_cyt_num),
                                                ImmunoCytoResult()).immunophenotype_cytochemistry_percent_positive = None
                else:
                    immuno_cyto_dict.setdefault(int(immuno_cyt_num),
                                                ImmunoCytoResult()).immunophenotype_cytochemistry_percent_positive = float(value)

            elif 'immunophenotype_cytochemistry_testing_result' in key:
                immuno_cyt_num = extract_number(key)
                immuno_cyto_dict.setdefault(int(immuno_cyt_num),
                                            ImmunoCytoResult()).immunophenotype_cytochemistry_testing_result = value

            elif 'fish_test_component_percentage_value' in key:
                fish_test_num = extract_number(key)
                if value == 'NA':
                    fish_test_dict.setdefault(int(fish_test_num),
                                              FishTestResult()).fish_test_component_percentage_value = None
                else:
                    fish_test_dict.setdefault(int(fish_test_num),
                                              FishTestResult()).fish_test_component_percentage_value = float(value)

            elif 'fish_test_component_results.fish_test_component_result' in key:
                fish_test_num = extract_number(key)
                fish_test_dict.setdefault(int(fish_test_num),
                                          FishTestResult()).fish_test_component = value

            # patient.race_list.race : white
            elif 'race_list.race' in key:
                pass

            # patient.cytogenetic_abnormalities.cytogenetic_abnormality : normal
            elif 'cytogenetic_abnormalities' in key:
                if LOGGING:
                    print('cytogenetic_abnormalities')
                cytogenetic_abnormality, cyt_abn_added = CytogeneticAbnormalities.objects.get_or_create(abnormality=value)
                cytogenetic_abnormalities_list.append(cytogenetic_abnormality)

            elif key in patient_non_nested_attrs and 'molecular_analysis_abnormality_testing_results' not in key:
                if LOGGING:
                    print('patient: {}'.format(key.split('.')[1]))
                if field_types[key] == 'NUMBER_TYPE':
                    if 'NA' not in value:
                        setattr(patient, key.split('.')[1], float(value))
                    else:
                        setattr(patient, key.split('.')[1], None)
                else:
                    setattr(patient, key.split('.')[1], str(value))
            # admin.batch_number : 25.17.0
            elif 'admin.' in key and 'admin.patient_withdrawal.withdrawn' not in key:
                if LOGGING:
                    print('admin: {}'.format(key.split('.')[1]))
                setattr(admin, key.split('.')[1], value)
        race.save()
        admin.save()
        patient.race_list = race
        patient.admin = admin
        patient.save()
        for cytogenetic_abnormality in cytogenetic_abnormalities_list:
            cytogenetic_abnormality.save()
            patient.cytogenetic_abnormalities.add(cytogenetic_abnormality)

        for num, immuno_cyto_typle in immuno_cyto_dict.items():
            immuno_cyto_record, immuno_cyto_record_created = ImmunophenotypeCytochemistryTestingResults.objects.get_or_create(
                immunophenotype_cytochemistry_testing_result=immuno_cyto_typle.immunophenotype_cytochemistry_testing_result,
                immunophenotype_cytochemistry_percent_positive=immuno_cyto_typle.immunophenotype_cytochemistry_percent_positive
            )
            immuno_cyto_record.save()
            patient.immunophenotype_cytochemistry_testing_results.add(immuno_cyto_record)

        for num, fish_tuple in fish_test_dict.items():
            fish_test_component_results_record, fish_test_created = FishTestComponentResults.objects.get_or_create(
                fish_test_component=fish_tuple.fish_test_component,
                fish_test_component_percentage_value=fish_tuple.fish_test_component_percentage_value
            )
            fish_test_component_results_record.save()
            patient.fish_test_component_results.add(fish_test_component_results_record)

        for num, molec_tuple in molecul_abnorm_dict.items():
            molecul_abnorm_record, molecul_abnorm_record_saved = MolecularAnalysisAbnormalityTestingResults.objects.get_or_create(
                molecular_analysis_abnormality_testing_result=molec_tuple.molecular_analysis_abnormality_testing_result,
                molecular_analysis_abnormality_testing_percentage_value=molec_tuple.molecular_analysis_abnormality_testing_percentage_value
            )
            molecul_abnorm_record.save()
            patient.molecular_analysis_abnormality_testing_results.add(molecul_abnorm_record)

    print("------> data is successfully extracted into DB")


if __name__ == "__main__":
    populate_database()
