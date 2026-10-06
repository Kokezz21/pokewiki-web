from django.contrib import admin
from .models import Pokemon

@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ("numero_pokedex", "nombre", "tipo_primario", "tipo_secundario", "activo", "creado_en")
    list_filter = ("tipo_primario", "activo")
    search_fields = ("nombre", "numero_pokedex")