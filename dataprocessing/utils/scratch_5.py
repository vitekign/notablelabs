
# patients = open_file_and_convert_to_key_value_pairs()
# patient_non_nested_attrs = set(find_non_nested_features(patients))
#
# admin = Admin()
# abnormality = CytogeneticAbnormalities()
# fish_test_component_results = FishTestComponentResults()
# race = RaceList()
# immunophenotype_cytochemistry_testing_results = ImmunophenotypeCytochemistryTestingResults()
# molecular_analysis_abnormality_testing_results = MolecularAnalysisAbnormalityTestingResults()
# patient = Patient()
#
# fish_test_component = ''
# immunophenotype_cytochemistry_percent_positive = ''
# molecular_analysis_abnormality_testing_percentage_value = ''
#
# for key, value in patients[0].items():
#     if key in patient_non_nested_attrs:
#         print('patient')
#         setattr(patient, key.split('.')[1], value)
#
#     # admin.batch_number : 25.17.0
#     elif 'admin.' in key:
#         print('admin')
#         setattr(admin, key.split('.')[1], value)
#
#     # patient.race_list.race : white
#     elif 'race_list' in key:
#         print('race list')
#         setattr(race, key.split('.')[2], value)
#
#     # patient.cytogenetic_abnormalities.cytogenetic_abnormality : normal
#     elif 'cytogenetic_abnormalities' in key:
#         print('cytogenetic_abnormalities')
#         setattr(abnormality, 'abnormality', value)
#
#     elif 'fish_test_component' in key and 'fish_test_component_percentage_value' not in key:
#         fish_test_component = value
#
#     elif 'fish_test_component_percentage_value' in key:
#         print('fish_test_component_percentage_value')
#         setattr(fish_test_component_results, 'fish_test_component', fish_test_component)
#         setattr(fish_test_component_results, 'fish_test_component_percentage', value)
#
#     elif 'immunophenotype_cytochemistry_percent_positive' in key:
#         immunophenotype_cytochemistry_percent_positive = value
#
#     elif 'immunophenotype_cytochemistry_testing_result' in key and 'immunophenotype_cytochemistry_percent_positive' not in key:
#         print('immunophenotype_cytochemistry_testing_result')
#         setattr(immunophenotype_cytochemistry_testing_results, 'immunophenotype_cytochemistry_percent_positive',
#                 immunophenotype_cytochemistry_percent_positive)
#         setattr(immunophenotype_cytochemistry_testing_results, 'immunophenotype_cytochemistry_testing_result', value)
#
#     elif 'molecular_analysis_abnormality_testing_percentage_value' in key:
#         molecular_analysis_abnormality_testing_percentage_value = value
#
#     elif 'molecular_analysis_abnormality_testing_result' in key and 'molecular_analysis_abnormality_testing_percentage_value' not in key:
#         print('molecular_analysis_abnormality_testing_result')
#         setattr(molecular_analysis_abnormality_testing_results, 'molecular_analysis_abnormality_testing_percentage_value',
#                 molecular_analysis_abnormality_testing_percentage_value)
#         setattr(molecular_analysis_abnormality_testing_results, 'molecular_analysis_abnormality_testing_result', value)
#
# race.save()
# patient.race_list = race
# admin.save()
# patient.admin = admin
# abnormality.save()
# patient.cytogenetic_abnormalities = abnormality
# immunophenotype_cytochemistry_testing_results.save()
# patient.immunophenotype_cytochemistry_testing_results = immunophenotype_cytochemistry_testing_results
# patient.molecular_analysis_abnormality_testing_results = molecular_analysis_abnormality_testing_results
# patient.save()




acute_myeloid_leukemia_calgb_cytogenetics_risk_category = CharField(max_length=32)
additional_studies = CharField(max_length=32)
age_at_initial_pathologic_diagnosis = CharField(max_length=32)
assessment_timepoint_category = CharField(max_length=32)
atra_exposure = CharField(max_length=32)
bcr_patient_barcode = CharField(max_length=32)
bcr_patient_uuid = CharField(max_length=32)
cumulative_agent_total_dose = CharField(max_length=32)
cytogenetic_abnormality_other = CharField(max_length=32)
cytogenetic_analysis_performed_ind = CharField(max_length=32)
day_of_form_completion = CharField(max_length=32)
days_to_birth = CharField(max_length=32)
days_to_death = CharField(max_length=32)
days_to_initial_pathologic_diagnosis = CharField(max_length=32)
days_to_last_followup = CharField(max_length=32)
days_to_last_known_alive = CharField(max_length=32)
disease_detection_molecular_analysis_method_type = CharField(max_length=32)
disease_detection_molecular_analysis_method_type_other_text = CharField(max_length=32)
drugs = CharField(max_length=32)
eastern_cancer_oncology_group = CharField(max_length=32)
ethnicity = CharField(max_length=32)
fish_evaluation_performed_ind = CharField(max_length=32)
fish_test_component_results = CharField(max_length=32)
fluorescence_in_situ_hybrid_cytogenetics_metaphase_nucleus_result_count = CharField(max_length=32)
fluorescence_in_situ_hybridization_abnormal_result_indicator = CharField(max_length=32)
follow_ups = CharField(max_length=32)
gender = CharField(max_length=32)
germline_testing_performed = CharField(max_length=32)
history_of_neoadjuvant_treatment = CharField(max_length=32)
hydroxyurea_administration_prior_registration_clinical_study_indicator = CharField(max_length=32)
hydroxyurea_agent_administered_day_count = CharField(max_length=32)
icd_10 = CharField(max_length=32)
icd_o_3_histology = CharField(max_length=32)
icd_o_3_site = CharField(max_length=32)
informed_consent_verified = CharField(max_length=32)
initial_pathologic_diagnosis_method = CharField(max_length=32)
karnofsky_performance_score = CharField(max_length=32)
lab_procedure_abnormal_lymphocyte_result_percent_value = CharField(max_length=32)
lab_procedure_blast_cell_outcome_percentage_value = CharField(max_length=32)
lab_procedure_bone_marrow_band_cell_result_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_basophil_result_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_blast_cell_outcome_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_cellularity_outcome_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_diff_not_reported_reason = CharField(max_length=32)
lab_procedure_bone_marrow_lab_eosinophil_result_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_lymphocyte_outcome_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_metamyelocyte_result_value = CharField(max_length=32)
lab_procedure_bone_marrow_myelocyte_result_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_neutrophil_result_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_prolymphocyte_result_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_promonocyte_count_result_percent_value = CharField(max_length=32)
lab_procedure_bone_marrow_promyelocyte_result_percent_value = CharField(max_length=32)
lab_procedure_hematocrit_outcome_percent_value = CharField(max_length=32)
lab_procedure_hemoglobin_result_specified_value = CharField(max_length=32)
lab_procedure_leukocyte_result_unspecified_value = CharField(max_length=32)
lab_procedure_monocyte_result_percent_value = CharField(max_length=32)
leukemia_french_american_british_morphology_code = CharField(max_length=32)
leukemia_specimen_cell_source_type = CharField(max_length=32)
molecular_analysis_abnormal_result_indicator = CharField(max_length=32)
molecular_analysis_abnormality_testing_results = CharField(max_length=32)
month_of_form_completion = CharField(max_length=32)
other_dx = CharField(max_length=32)
patient_id = CharField(max_length=32)
performance_status_scale_timing = CharField(max_length=32)
person_history_leukemogenic_agent_other_exposure_text = CharField(max_length=32)
person_history_nonmedical_leukemia_causing_agent_type = CharField(max_length=32)
platelet_result_count = CharField(max_length=32)
prior_hematologic_disorder_diagnosis_indicator = CharField(max_length=32)
radiations = CharField(max_length=32)
steroid_therapy_administered = CharField(max_length=32)
tissue_source_site = CharField(max_length=32)
total_dose_units = CharField(max_length=32)
tumor_tissue_site = CharField(max_length=32)
tumor_tissue_site_other = CharField(max_length=32)
vital_status = CharField(max_length=32)
year_of_form_completion = CharField(max_length=32)
year_of_initial_pathologic_diagnosis = CharField(max_length=32)