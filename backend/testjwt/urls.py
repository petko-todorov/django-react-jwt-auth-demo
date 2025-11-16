from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from testjwt.views import RegisterView, LogoutView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(),
         name='login'),
    path('token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
