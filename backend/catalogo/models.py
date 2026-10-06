from django.db import models

class Pokemon(models.Model):
    """Modelo que representa una especie Pokémon dentro de la PokéWiki."""
    numero_pokedex = models.PositiveIntegerField(unique=True, verbose_name="N° Pokédex")
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    tipo_primario = models.CharField(max_length=50, verbose_name="Tipo Primario")
    tipo_secundario = models.CharField(max_length=50, blank=True, null=True, verbose_name="Tipo Secundario")
    descripcion = models.TextField(blank=True, verbose_name="Descripción de la Pokédex")
    activo = models.BooleanField(default=True, verbose_name="Visible en la Wiki")
    creado_en = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de registro")

    class Meta:
        ordering = ["numero_pokedex"]
        verbose_name = "Pokémon"
        verbose_name_plural = "Pokémons"

    def __str__(self):
        return f"#{self.numero_pokedex} - {self.nombre}"