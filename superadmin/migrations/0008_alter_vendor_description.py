# Generated by Django 4.2.3 on 2023-08-23 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('superadmin', '0007_alter_vendor_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]