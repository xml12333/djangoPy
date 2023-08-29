from rest_framework import serializers
from projects.models import Project, Tag ,Review
from users.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    owner = ProfileSerializer(many=False)
    tags = TagSerializer(many=True)
    review = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Project
        # fields = ['id','owner','title','description','featured_image','demo_link','source_link','vote_total','vote_ratio','created']
        fields = '__all__'

    def get_review(obj,self):
        reviews= self.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
  