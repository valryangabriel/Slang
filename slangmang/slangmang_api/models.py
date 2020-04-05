from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'Category Name: {self.name}'

class Word(models.Model):
    word = models.CharField(max_length=255)
    definition = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null = True)

    def _string__(self):
        return f'Word: {self.word}'
