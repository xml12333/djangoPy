from django.contrib import admin
from .models import Car
from django.utils.html import format_html


class CarAdmin(admin.ModelAdmin):
    def thumbnail(self, object):
        return format_html('<img src="{}" width="40" style="border-radius:50px;"/>'.format(object.car_photo.url))

    list_display = ('id', 'thumbnail', 'car_title', 'city', 'color',
                    'model', 'year', 'body_style', 'fule_type', 'is_featured',)
    thumbnail.short_description = 'Car Image'
    list_display_links = ('id', 'thumbnail', 'car_title',)
    search_fields =('car_title',)
    list_editable = ('is_featured',)
    list_filter = ('city','model',)

admin.site.register(Car, CarAdmin)
