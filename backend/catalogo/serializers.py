from rest_framework import serializers
from .models import Pokemon

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = [
            "id",
            "numero_pokedex",
            "nombre",
            "tipo_primario",
            "tipo_secundario",
            "descripcion",
            "activo",
            "creado_en"
        ]
        read_only_fields = ["id", "creado_en"]

    # Validación personalizada en el servidor requerida por la pauta
    def validate_numero_pokedex(self, value):
        if value <= 0:
            raise serializers.ValidationError("El número de Pokédex debe ser mayor que 0.")
        return value

    def validate_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacío.")
        return value