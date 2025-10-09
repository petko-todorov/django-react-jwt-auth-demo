from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from testjwt.views import RegisterView, LogoutView

from testjwt.views import CustomTokenObtainPairView

urlpatterns = [
    # path('api/', include([
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='login'),  # Login endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh endpoint
    path('logout/', LogoutView.as_view(), name='logout'),  # Logout endpoint
    # ])),
]
