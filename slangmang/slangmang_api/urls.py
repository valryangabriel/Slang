from django.urls import path
from . import views

urlpatterns = [
    # USER
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),

    # Category
    path('category/<int:user_id>/list/', views.category_list),
    path('category/<int:user_id>/create/', views.create_category),
    path('category/<int:category_id>/detail/', views.category_detail),
    path('category/<int:category_id>/edit/', views.category_edit),
    path('category/<int:category_id>/delete/', views.category_delete),

    # WORD
    path('category/<int:category_id>/word-list/', views.word_list),
    path('word/<int:word_id>/detail/', views.word_detail),
    path('category/<int:category_id>/word/create/', views.create_word),
    path('word/<int:word_id>/edit/', views.edit_word),
    path('category/<int:word_id>/del/', views.word_delete),
]