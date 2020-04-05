from django import forms
from .models import Category, Word

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name',]

class WordForm(forms.ModelForm):
    class Meta:
        model = Word
        fields = [ 'word','definition', ]