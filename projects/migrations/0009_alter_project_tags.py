# Generated by Django 3.2.12 on 2022-04-14 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0008_alter_project_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='projects.Tag'),
        ),
    ]
