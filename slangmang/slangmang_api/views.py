
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, CategorySerializer, WordSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json
from .forms import CategoryForm, WordForm


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CATEGORY ------------

def category_list(request,user_id):
    queryset = Category.objects.all().filter(user_id=user_id)
    serialized = CategorySerializer(queryset, many=True)
    return JsonResponse(data=serialized.data, safe=False)

def category_detail(request, category_id):
    queryset = Category.objects.get(id=category_id)
    serialized = CategorySerializer(queryset, many=False)
    return JsonResponse(data=serialized.data, safe=False)

@csrf_exempt
def create_category(request,user_id):
    user = User.objects.get(id=user_id)
    data = json.loads(request.body)
    if request.method == 'POST':
        form = CategoryForm(data)
        if form.is_valid():
            category = form.save(commit=False)
            category.user = user
            category.save()
            serializer = CategorySerializer(category)
            return JsonResponse(data=serializer.data, safe=False)

@csrf_exempt
def category_edit(request, category_id):
    category = Category.objects.get(id=category_id)
    data = json.loads(request.body)
    print(data)
    if request.method == 'POST':
        form = CategoryForm(data, instance = category)
        if form.is_valid():
            category = form.save(commit=True)
            category.save()
            serialzer = CategorySerializer(category)
            return JsonResponse(serialzer.data, safe = False)

@csrf_exempt
def category_delete(request, category_id):
    category = Category.objects.get(id=category_id)
    category.delete()
    return JsonResponse(data={'message':'Successfully Deleted Category'})

# WORD ----------------
def word_list(request, category_id):
    queryset = Word.objects.all().filter(category_id=category_id)
    serialized = WordSerializer(queryset, many=True)
    return JsonResponse(data=serialized.data, safe=False)

def word_detail(request, word_id):
    word = Word.objects.get(id=word_id)
    serializer = WordSerializer(word, many=False)
    return JsonResponse(data=serializer.data, safe=False)

@csrf_exempt
def create_word(request, category_id):
    category = Category.objects.get(id=category_id)
    data = json.loads(request.body)
    if request.method == 'POST':
        form = WordForm(data)
        if form.is_valid():
            word = form.save(commit=False)
            word.category = category
            word.save()
            serializer = WordSerializer(word)
            print(serializer.data)
            return JsonResponse(data=serializer.data, safe=False)

@csrf_exempt
def edit_word(request, word_id):
    word = Word.objects.get(id=word_id)
    data = json.loads(request.body)
    if request.method == 'POST':
        form = WordForm(data, instance = word)
        if form.is_valid():
            word = form.save(commit=False)
            word.save()
            serialzer = WordSerializer(word)
            return JsonResponse(serialzer.data, safe = False)

@csrf_exempt
def word_delete(request, word_id):
    word = Word.objects.get(id=word_id)
    word.delete()
    return JsonResponse(data={'message' : 'Successfully Deleted Word'})

