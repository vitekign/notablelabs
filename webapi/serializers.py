from rest_framework import serializers

from dataprocessing.models import Patient, RaceList, Admin, CytogeneticAbnormalities


class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RaceList
        fields = ('race',)


class CytogeneticAbnormalitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CytogeneticAbnormalities
        fields = ('abnormality',)


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ('batch_number', 'bcr', 'day_of_dcc_upload', 'disease_code',
                  'file_uuid', 'month_of_dcc_upload', 'project_code', 'year_of_dcc_upload')


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        depth = 2
        fields = (
            'patient_id', 'gender', 'ethnicity', 'platelet_result_count', 'vital_status',
        )


class PatientAllDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        depth = 2
        fields = ('__all__')
