from django.test import TestCase
from rest_framework.test import APIClient
import json
from dataprocessing.utils.retrieve_features import open_file_and_convert_to_key_value_pairs

from dataprocessing.models import Patient

NUMBER_OF_PATIENTS = 200


class NotableLabsWebApiTest(TestCase):
    fixtures = ['tests.json']

    def setUp(self):
        self.client = APIClient()

    def test_loads_formatted_patients(self):
        response = self.client.get('/api/v1/patients/', format='json')
        assert response.status_code == 200

    def test_loads_ALL_formatted_patients(self):
        response = self.client.get('/api/v1/patients/', format='json')
        json_data = json.loads(response.content.decode())
        self.assertEqual(len(json_data), NUMBER_OF_PATIENTS)

    def test_keys_of_formatted_patients(self):
        keys = {'patient_id', 'gender', 'ethnicity', 'platelet_result_count', 'vital_status'}
        response = self.client.get('/api/v1/patients/', format='json')
        json_data = json.loads(response.content.decode())
        for patient in json_data:
            self.assertTrue(set(patient.keys()) == keys)

    def test_values_of_formatted_patients(self):
        response = self.client.get('/api/v1/patients/', format='json')
        json_data = json.loads(response.content.decode())
        for patient in json_data:
            patient_orm = Patient.objects.filter(patient_id__exact=patient['patient_id']).first()
            self.assertEqual(patient_orm.patient_id, patient['patient_id'])
            self.assertEqual(patient_orm.gender, patient['gender'])
            self.assertEqual(patient_orm.ethnicity, patient['ethnicity'])
            self.assertEqual(patient_orm.platelet_result_count, patient['platelet_result_count'])
            self.assertEqual(patient_orm.vital_status, patient['vital_status'])

    def test_loads_detailed_info(self):
        patients = Patient.objects.all()
        for patient in patients:
            current_id = int(patient.patient_id)
            response = self.client.get(f'/api/v1/patients/{current_id}', format='json')
            json_data = json.loads(response.content.decode())

            self.assertEqual(patient.patient_id, json_data['patient_id'])
            self.assertEqual(patient.gender, json_data['gender'])
            self.assertEqual(patient.ethnicity, json_data['ethnicity'])
            self.assertEqual(patient.platelet_result_count, json_data['platelet_result_count'])
            self.assertEqual(patient.vital_status, json_data['vital_status'])

    def test_loads_detailed_info_shape(self):
        detailed_info_subsets = {'admin', 'race_list', 'cytogenetic_abnormalities',
                                 'fish_test_component_results',
                                 'immunophenotype_cytochemistry_testing_results',
                                 'molecular_analysis_abnormality_testing_results', }
        patients = Patient.objects.all()
        for patient in patients:
            current_id = int(patient.patient_id)
            response = self.client.get(f'/api/v1/patients/{current_id}', format='json')
            json_data = json.loads(response.content.decode())
            self.assertTrue(len(detailed_info_subsets - set(json_data.keys())) == 0)

    def test_compare_db_data_against_data_in_a_file(self):
        patients_from_file = open_file_and_convert_to_key_value_pairs()
        for patient_from_file in patients_from_file:
            id = patient_from_file['patient.patient_id']
            patient_from_db = Patient.objects.filter(patient_id__exact=id).first()
            self.assertEqual(patient_from_file['admin.file_uuid'], patient_from_db.admin.file_uuid)
            withdrawn = 'true' if patient_from_db.admin.patient_withdrawal.withdrawn else 'false'
            self.assertEqual(patient_from_file['admin.patient_withdrawal.withdrawn'], withdrawn)
            self.assertEqual(int(patient_from_file['patient.days_to_birth']), int(patient_from_db.days_to_birth))

