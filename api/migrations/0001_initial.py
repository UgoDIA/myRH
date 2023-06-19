# Generated by Django 4.2.2 on 2023-06-17 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Emp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prenom', models.CharField(max_length=50)),
                ('nom', models.CharField(max_length=50)),
                ('sexe', models.CharField(max_length=50)),
                ('tel', models.CharField(blank=True, max_length=50, null=True)),
                ('email_pro', models.CharField(blank=True, max_length=50, null=True)),
                ('email_perso', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'emp',
            },
        ),
    ]