from rest_framework.routers import DefaultRouter
from .views import PokemonViewSet

router = DefaultRouter()
router.register("pokemon", PokemonViewSet, basename="pokemon")

urlpatterns = router.urls