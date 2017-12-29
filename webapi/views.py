from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView

from dataprocessing.models import Patient
from webapi.serializers import PatientSerializer, PatientAllDetailsSerializer


class PatientDetails(APIView):
    def get_object(self, pk):
        try:
            return Patient.objects.filter(patient_id=2802)
        except Patient.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        query_set = Patient.objects.filter(patient_id=id).first()
        patient_serializer = PatientAllDetailsSerializer(query_set)
        return Response(patient_serializer.data)


class PatientsDetails(APIView):
    def get(self, request, format=None):
        patients = Patient.objects.all()
        patient_serializer = PatientSerializer(patients, many=True)

        # race = patients.all()
        # race_serializer = RaceSerializer(race)

        return Response(patient_serializer.data)
