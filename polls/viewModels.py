# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import F
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from .models import Choice, Question
from rest_framework.response import Response

from rest_framework import viewsets
from serializers import QuestionSerializer, ChoiceSerializer
from serializers import UserSerializer
from rest_framework import permissions
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

for user in User.objects.all():
    Token.objects.get_or_create(user=user)


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows questions to be viewed or edited.
    """
    queryset = Question.objects.all().order_by('-pub_date')
    serializer_class = QuestionSerializer
    permission_classes = (permissions.AllowAny,)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class ChoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows choices to be viewed or edited.
    """
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = (permissions.AllowAny,)

    def retrieve(self, request, pk=None):
        queryset = Choice.objects.filter(question__in=Question.objects.filter(id=pk))
        serializer = ChoiceSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

def question_choices(request, question_id):
    question_choices = Choice.objects.filter(question=question_id)

    serializer = ChoiceSerializer(question_choices, many=True)
    return Response(serializer.data)

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes = F('votes') + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
