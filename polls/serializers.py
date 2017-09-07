from rest_framework import serializers
from .models import Question, Choice
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'password')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    # owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Question
        fields = ('id', 'question_text', 'pub_date')

class ChoiceSerializer(serializers.HyperlinkedModelSerializer):
    question = serializers.HyperlinkedRelatedField(many=False, view_name='choice-question-detail', read_only=True)
    class Meta:
        model = Choice
        fields = ('id', 'question', 'choice_text', 'votes')