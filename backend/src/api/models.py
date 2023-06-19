from django.db import models

# Create your models here.

class Emp(models.Model):
    prenom = models.CharField(max_length=50)
    nom = models.CharField(max_length=50)
    sexe = models.CharField(max_length=50)
    tel = models.CharField(max_length=50, blank=True, null=True)
    email_pro = models.CharField(max_length=50, blank=True, null=True)
    email_perso = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'emp'
