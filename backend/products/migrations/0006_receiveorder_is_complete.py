# Generated by Django 2.2.17 on 2021-01-11 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_receiveorder'),
    ]

    operations = [
        migrations.AddField(
            model_name='receiveorder',
            name='is_complete',
            field=models.BooleanField(default=False),
        ),
    ]