from django.shortcuts import get_object_or_404, render
from .models import Car
from django.core.paginator import Paginator


def cars(request):
    all_cars = Car.objects.all().order_by('id')
    paginator = Paginator(all_cars, 2)
    page = request.GET.get('page')
    paged_cars = paginator.get_page(page)
    model_search = Car.objects.values_list('model',flat=True).distinct()
    city_search = Car.objects.values_list('city',flat=True).distinct()
    year_search = Car.objects.values_list('year',flat=True).distinct()
    body_style_search = Car.objects.values_list('body_style',flat=True).distinct()
    
    context = {'all_cars': paged_cars,'model_search':model_search,
    'city_search':city_search,'year_search':year_search,'body_style_search':body_style_search}
    return render(request, 'cars/cars.html', context)


def car_detail(request, id):
    car = get_object_or_404(Car, pk=id)
    context = {'car': car}
    return render(request, 'cars/car_detail.html', context)

def search_filter_iexact(field_name, list_objects,request):
    if field_name in request.GET:
        value = request.GET[field_name]
        if value:
            filter_dict = {field_name+'__iexact':value}
            list_objects = list_objects.filter(**filter_dict)
            return list_objects
        else:
            return list_objects
    else:
        return list_objects

def search(request):
    cars = Car.objects.order_by('-created_date')
   
    model_search = Car.objects.values_list('model',flat=True).distinct()
    city_search = Car.objects.values_list('city',flat=True).distinct()
    year_search = Car.objects.values_list('year',flat=True).distinct()
    body_style_search = Car.objects.values_list('body_style',flat=True).distinct()
    transmission_search = Car.objects.values_list('transmission',flat=True).distinct()

    cars = search_filter_iexact('keyword',cars,request)
    cars = search_filter_iexact('model',cars,request)
    cars = search_filter_iexact('city',cars,request)
    cars = search_filter_iexact('year',cars,request)
    cars = search_filter_iexact('body_style',cars,request)
    cars = search_filter_iexact('transmission',cars,request)

    if 'min_price' in request.GET:
        min_price = request.GET['min_price']
        max_price = request.GET['max_price']
        if max_price:
            cars = cars.filter(price__gte=min_price, price__lte=max_price)

    context = {'cars': cars,'model_search':model_search,'transmission_search':transmission_search,
    'city_search':city_search,'year_search':year_search,'body_style_search':body_style_search}
    return render(request, 'cars/search.html', context)
