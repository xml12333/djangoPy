# Generated by Django 3.2.12 on 2022-04-09 12:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_auto_20220409_1303'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='discription',
            new_name='description',
        ),
    ]
