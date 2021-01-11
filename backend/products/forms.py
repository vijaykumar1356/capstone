from django import forms

class OrderForm(forms.Form):
    name = forms.CharField(max_length=50)
    email = forms.EmailField()
    amount = forms.IntegerField()