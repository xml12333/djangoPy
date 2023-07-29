
from django.urls import path, include
from . import views
urlpatterns = [
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('user/', views.UserAPIView.as_view(), name='user'),
    path('refresh/', views.RefreshAPIView.as_view(), name='refresh'),
    path('logout/', views.LogoutAPIView.as_view(), name='logout'),
    path('forgot/', views.ForgotAPIView.as_view(), name='forgot'),
    path('reset/', views.ResetAPIView.as_view(), name='reset'),
    path('two-factor/', views.TwoFactorLoginAPIView.as_view(), name='two-factor'),
    path('google-auth/', views.GoogleAuthAPIView.as_view(), name='google-auth'),
    
]
