from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/register/', views.register_view),
    path('api/login/', views.login_view),
    path('photos/', views.photo_list),
    path('photos/', views.photo_create),
    path('api/photos/<int:photo_id>/', views.photo_detail_delete),
    path('api/logout/', views.logout_view),
    path('users/<int:user_id>/', views.user_detail_view, name='user-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)