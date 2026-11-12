from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication  
from rest_framework.permissions import IsAuthenticated          
from .models import Pokemon
from .serializers import PokemonSerializer

class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated]          