from django.http import JsonResponse
from .models import Pokemon

def pokemon_list(request):
    """
    Devuelve en formato JSON la lista de Pokémon activos.
    Incluye desafío de búsqueda opcional por parámetro ?search=.
    """
    query = request.GET.get("search", "")
    pokemons = Pokemon.objects.filter(activo=True)

    if query:
        pokemons = pokemons.filter(nombre__icontains=query)

    # .values() entrega cada registro como diccionario {campo: valor}
    # list() fuerza la evaluación del QuerySet perezoso
    data = list(pokemons.values(
        "id", "numero_pokedex", "nombre", "tipo_primario", "tipo_secundario", "descripcion"
    ))

    # Devolvemos un objeto con count y results
    return JsonResponse({"count": len(data), "results": data})

def pokemon_detail(request, pk):
    """
    Desafío Destacado: detalle de un Pokémon específico.
    Si no existe o está inactivo, devuelve un 404 en formato JSON.
    """
    try:
        pokemon = Pokemon.objects.get(pk=pk, activo=True)
        data = {
            "id": pokemon.id,
            "numero_pokedex": pokemon.numero_pokedex,
            "nombre": pokemon.nombre,
            "tipo_primario": pokemon.tipo_primario,
            "tipo_secundario": pokemon.tipo_secundario,
            "descripcion": pokemon.descripcion,
        }
        return JsonResponse(data)
    except Pokemon.DoesNotExist:
        return JsonResponse({"error": "Pokémon no encontrado"}, status=404)