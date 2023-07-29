from rest_framework.serializers import ModelSerializer
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validation_data):
        password = validation_data.pop('password', None)
        instance = self.Meta.model(**validation_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

        