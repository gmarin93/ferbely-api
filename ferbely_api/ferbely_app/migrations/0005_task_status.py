# Generated by Django 5.2.3 on 2025-06-26 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ferbely_app', '0004_bill_is_paid'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('completed', 'Completed'), ('pending', 'Pending'), ('in_progress', 'In Progress')], default='pending', max_length=11),
        ),
    ]
