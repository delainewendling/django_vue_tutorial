from django.conf.urls import url, include

from . import viewModels
from rest_framework import routers
from rest_framework.authtoken import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'choices', viewModels.ChoiceViewSet)
router.register(r'questions', viewModels.QuestionViewSet)
router.register(r'accounts', viewModels.UserViewSet)
urlpatterns =[
    url(r'^', include(router.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token)
]

app_name = 'polls'
# urlpatterns = [
#     url(r'^$', views.index, name='index'),
#     # ex: /polls/5/
#     url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
#     # ex: /polls/5/results/
#     url(r'^(?P<question_id>[0-9]+)/results/$', views.results, name='results'),
#     # ex: /polls/5/vote/
#     url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
# ]
# urlpatterns = [
#     url(r'^$', views.IndexView.as_view(), name='index'),
#     url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
#     url(r'^(?P<pk>[0-9]+)/results/$', views.ResultsView.as_view(), name='results'),
#     url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
# ]
