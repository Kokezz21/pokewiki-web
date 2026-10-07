from rest_framework import viewsets
from .models import Pokemon
from .serializers import PokemonSerializer

class PokemonViewSet(viewsets.ModelViewSet):
    """CRUD completo de Pokémon: listar, crear, ver, editar y eliminar."""
    queryset = Pokemon.objects.all().order_by("numero_pokedex")
    serializer_class = PokemonSerializer