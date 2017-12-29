from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from webapi import views

urlpatterns = [
    url(r'^patients/(?P<id>[0-9]+)/?$', views.PatientDetails.as_view()),
    url(r'^patients/?$', views.PatientsDetails.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)