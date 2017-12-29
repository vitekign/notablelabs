from django.db import models
from django.db.models import Model, ManyToManyField, CharField, BooleanField


class PatientWithdrawal(models.Model):
    withdrawn = BooleanField(default=False, )  # What if the value is 'Na' in the dataset...


class Admin(models.Model):
    # TODO: ASK QUESTION - Do I need to create a one-to-many. All of the values are 'false'
    # admin.patient_withdrawal.withdrawn
    patient_withdrawal = models.ForeignKey(PatientWithdrawal, null=True)
    batch_number = CharField(max_length=32)
    bcr = CharField(max_length=32)
    day_of_dcc_upload = CharField(max_length=32)
    disease_code = CharField(max_length=32)
    file_uuid = CharField(max_length=32)
    month_of_dcc_upload = CharField(max_length=32)
    project_code = CharField(max_length=32)
    year_of_dcc_upload = CharField(max_length=32)


# patient.cytogenetic_abnormalities.cytogenetic_abnormality
class CytogeneticAbnormalities(models.Model):
    abnormality = CharField(max_length=64)


# patient.fish_test_component_results.fish_test_component_result.fish_test_component,
# patient.fish_test_component_results.fish_test_component_result.fish_test_component_percentage_value,
class FishTestComponentResults(models.Model):
    fish_test_component = CharField(max_length=64)
    fish_test_component_percentage = CharField(max_length=64)


# patient.race_list.race
class RaceList(models.Model):
    race = CharField(max_length=64, unique=True)


# patient.immunophenotype_cytochemistry_testing_results.immunophenotype_cytochemistry_testing_result_values.immunophenotype_cytochemistry_percent_positive
# patient.immunophenotype_cytochemistry_testing_results.immunophenotype_cytochemistry_testing_result_values.immunophenotype_cytochemistry_testing_result
class ImmunophenotypeCytochemistryTestingResults(models.Model):
    immunophenotype_cytochemistry_percent_positive = CharField(max_length=64)
    immunophenotype_cytochemistry_testing_result = CharField(max_length=64)


#  patient.molecular_analysis_abnormality_testing_results.molecular_analysis_abnormality_testing_result_values.molecular_analysis_abnormality_testing_percentage_value
#  patient.molecular_analysis_abnormality_testing_results.molecular_analysis_abnormality_testing_result_values.molecular_analysis_abnormality_testing_result
class MolecularAnalysisAbnormalityTestingResults(models.Model):
    molecular_analysis_abnormality_testing_percentage_value = CharField(max_length=64)
    molecular_analysis_abnormality_testing_result = CharField(max_length=64)


class Patient(models.Model):
    cytogenetic_abnormalities_1 = CharField(max_length=64, default='cytogenetic_abnormalities')
    acute_myeloid_leukemia_calgb_cytogenetics_risk_category = CharField(max_length=64, default='')
    additional_studies = CharField(max_length=64, default='')
    age_at_initial_pathologic_diagnosis = models.FloatField(max_length=128, null=True)
    assessment_timepoint_category = CharField(max_length=64, default='')
    atra_exposure = CharField(max_length=64, default='')
    bcr_patient_barcode = CharField(max_length=64, default='')
    bcr_patient_uuid = CharField(max_length=64, default='')
    cumulative_agent_total_dose = models.FloatField(max_length=128, null=True)
    cytogenetic_abnormality_other = CharField(max_length=64, default='')
    cytogenetic_analysis_performed_ind = CharField(max_length=64, default='')
    day_of_form_completion = models.FloatField(max_length=128, null=True)
    days_to_birth = models.FloatField(max_length=128, null=True)
    days_to_death = models.FloatField(max_length=128, null=True)
    days_to_initial_pathologic_diagnosis = models.FloatField(max_length=128, null=True)
    days_to_last_followup = models.FloatField(max_length=128, null=True)
    days_to_last_known_alive = CharField(max_length=64, default='')
    disease_detection_molecular_analysis_method_type = CharField(max_length=64, default='')
    disease_detection_molecular_analysis_method_type_other_text = CharField(max_length=64, default='')
    drugs = CharField(max_length=64, default='')
    eastern_cancer_oncology_group = CharField(max_length=64, default='')
    ethnicity = CharField(max_length=64, default='')
    fish_evaluation_performed_ind = CharField(max_length=64, default='')
    fish_test_component_results = CharField(max_length=64, default='')
    fluorescence_in_situ_hybrid_cytogenetics_metaphase_nucleus_result_count = models.FloatField(max_length=128, null=True)
    fluorescence_in_situ_hybridization_abnormal_result_indicator = CharField(max_length=64, default='')
    follow_ups = CharField(max_length=64, default='')
    gender = CharField(max_length=64, default='')
    germline_testing_performed = CharField(max_length=64, default='')
    history_of_neoadjuvant_treatment = CharField(max_length=64, default='')
    hydroxyurea_administration_prior_registration_clinical_study_indicator = CharField(max_length=64, default='')
    hydroxyurea_agent_administered_day_count = models.FloatField(max_length=128, null=True)
    icd_10 = CharField(max_length=64, default='')
    icd_o_3_histology = CharField(max_length=64, default='')
    icd_o_3_site = CharField(max_length=64, default='')
    informed_consent_verified = CharField(max_length=64, default='')
    initial_pathologic_diagnosis_method = CharField(max_length=64, default='')
    karnofsky_performance_score = CharField(max_length=64, default='')
    lab_procedure_abnormal_lymphocyte_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_blast_cell_outcome_percentage_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_band_cell_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_basophil_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_blast_cell_outcome_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_cellularity_outcome_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_diff_not_reported_reason = CharField(max_length=64, default='')
    lab_procedure_bone_marrow_lab_eosinophil_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_lymphocyte_outcome_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_metamyelocyte_result_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_myelocyte_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_neutrophil_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_prolymphocyte_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_promonocyte_count_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_bone_marrow_promyelocyte_result_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_hematocrit_outcome_percent_value = models.FloatField(max_length=128, null=True)
    lab_procedure_hemoglobin_result_specified_value = models.FloatField(max_length=128, null=True)
    lab_procedure_leukocyte_result_unspecified_value = models.FloatField(max_length=128, null=True)
    lab_procedure_monocyte_result_percent_value = models.FloatField(max_length=128, null=True)
    leukemia_french_american_british_morphology_code = CharField(max_length=64, default='')
    leukemia_specimen_cell_source_type = CharField(max_length=64, default='')
    molecular_analysis_abnormal_result_indicator = CharField(max_length=64, default='')
    molecular_analysis_abnormality_testing_results = CharField(max_length=64, default='')
    month_of_form_completion = models.FloatField(max_length=128, null=True)
    other_dx = CharField(max_length=64, default='')
    patient_id = models.FloatField(max_length=128, null=True)
    performance_status_scale_timing = CharField(max_length=64, default='')
    person_history_leukemogenic_agent_other_exposure_text = CharField(max_length=64, default='')
    person_history_nonmedical_leukemia_causing_agent_type = CharField(max_length=64, default='')
    platelet_result_count = models.FloatField(max_length=128, null=True)
    prior_hematologic_disorder_diagnosis_indicator = CharField(max_length=64, default='')
    radiations = CharField(max_length=64, default='')
    steroid_therapy_administered = CharField(max_length=64, default='')
    tissue_source_site = CharField(max_length=64, default='')
    total_dose_units = CharField(max_length=64, default='')
    tumor_tissue_site = CharField(max_length=64, default='')
    tumor_tissue_site_other = CharField(max_length=64, default='')
    vital_status = CharField(max_length=64, default='')
    year_of_form_completion = models.FloatField(max_length=128, null=True)
    year_of_initial_pathologic_diagnosis = models.FloatField(max_length=128, null=True)

    admin = models.OneToOneField(Admin)
    race_list = models.ForeignKey(RaceList)
    cytogenetic_abnormalities = ManyToManyField(CytogeneticAbnormalities)

    immunophenotype_cytochemistry_testing_results = ManyToManyField(ImmunophenotypeCytochemistryTestingResults)
    molecular_analysis_abnormality_testing_results = ManyToManyField(MolecularAnalysisAbnormalityTestingResults)