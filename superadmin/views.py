from django.shortcuts import render, redirect
from .models import *
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.urls import reverse

import logging

logger = logging.getLogger(__name__)

# Create your views here.

def index(request):
    return render(request, "superadmin/dashboard.html")


def administrators(request):
    Administrators = Admin.objects.all()

    if request.method == 'POST':
        adminid = request.POST.get('adminid')
        adminname = request.POST.get('adminname')

        action = request.POST.get('action')
        
        if action == 'save':
            admin = Admin(adminid=adminid, adminname=adminname)
            admin.save()
            return HttpResponse('Admin Created Successfully!')

        elif action == 'save_and_add':
           admin = Admin(adminid=adminid, adminname=adminname)
           admin.save()
           return redirect('administrators')

    return render(request, "superadmin/administrators.html", {
        "Administrators": Administrators,
    })
    
def edit_admin(request, admin_id):
    try:
        admin = get_object_or_404(Admin, pk=admin_id)

        if request.method == "GET":
            # Handle GET request to retrieve vendor data
            data = {
                "adminid": admin.adminid,
                "adminname": admin.adminname,
            }
            return JsonResponse(data)
        
        elif request.method == "POST":
            # Handle POST request to update vendor data
            
            admin.adminid = request.POST.get("adminid")
            admin.adminname = request.POST.get("adminname")
            admin.save()
            
            # Return a success response
            return JsonResponse({"success": True})
        
    except Admin.DoesNotExist:
        return JsonResponse({"error": "Category not found!"}, status=400)
    
def delete_admin(request, admin_id):
    try:
        Admin.objects.get(id=admin_id).delete()
        return JsonResponse({'message': 'Record deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': 'Unable to delete record'}, status=500)
        

  
def vendors(request):
    Vendors = Vendor.objects.all()
    # vendor_list =  reverse("vendors")
    if request.method == 'POST':
        name = request.POST.get('name')
        cities = request.POST.get('cities')
        countries = request.POST.get('countries')
        description = request.POST.get('description') or 'No description available'
        contact = request.POST.get('contact')
        
        
        action = request.POST.get('action')
        
        if action == 'save':
            vendor = Vendor(name=name, cities=cities, countries=countries, description=description, contact=contact)
            vendor.save()
            return HttpResponse('Vendor Added Successfully!')
        
        elif action == 'save_and_add':
            vendor = Vendor(name=name, cities=cities, countries=countries, description=description, contact=contact)
            vendor.save()
            return redirect('vendors')
    return render(request, "superadmin/vendors.html", {
        "Vendors": Vendors
        })

def edit_vendor(request, vendor_id):
    try:
        vendor = get_object_or_404(Vendor, pk=vendor_id)

        if request.method == "GET":
            # Handle GET request to retrieve vendor data
            data = {
                "name": vendor.name,
                "contact": vendor.contact,
                "countries": vendor.countries,
                "cities": vendor.cities,
                "description": vendor.description
            }
            return JsonResponse(data)
        
        elif request.method == "POST":
            # Handle POST request to update vendor data
            
            vendor.name = request.POST.get("name")
            vendor.contact = request.POST.get("contact")
            vendor.countries = request.POST.get("countries")
            vendor.cities = request.POST.get("cities")
            vendor.description = request.POST.get("description") or 'No description available'
            vendor.save()
            
            # Return a success response
            return JsonResponse({"success": True})
        
    except Vendor.DoesNotExist:
        return JsonResponse({"error": "Vendor not found!"}, status=400)

      
def delete_vendor(request, vendor_id):
    vendor = get_object_or_404(Vendor, id=vendor_id)
    try:
        vendor.delete()
        return JsonResponse({'message': 'Record deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': 'Unable to delete record'}, status=500)


def categories(request):
    Categories = Category.objects.all()
    existing_category_types = Category.objects.values_list('categorytype', flat=True).distinct()
    if request.method == 'POST':
        
        category = request.POST.get('category')
        categorytype = request.POST.get('categorytype')
        
        
        action = request.POST.get('action')
        
        if action == 'save':
            category = Category(category=category, categorytype=categorytype)
            category.save()
            return HttpResponse('Category has been added successfully!')
        elif action == 'save_and_add':
            category = Category(category=category, categorytype=categorytype)
            category.save()
            return redirect('categories')
        elif action == 'add_category':
            display_category_type_dropdown = True
        else:
            display_category_type_dropdown = False
    else:
            display_category_type_dropdown = False

    return render(request, "superadmin/categories.html", {
        "Categories":Categories,
        "display_category_type_dropdown": display_category_type_dropdown,
        "existing_category_types": existing_category_types
    })
    
def edit_category(request, category_id):
    try:
        category = get_object_or_404(Category, pk=category_id)

        if request.method == "GET":
            # Handle GET request to retrieve category data
            data = {
                "category": category.category,
                "categorytype": category.categorytype,
            }
            return JsonResponse(data)
        
        elif request.method == "POST":
            # Handle POST request to update category data
            try:
                edit_category = request.POST.get("category")
                edit_categorytype = request.POST.get("categorytype")
            
                category.category = edit_category
                category.categorytype = edit_categorytype
            
                category.save()
            
                # Return a success response
                return JsonResponse({"success": True})
            
            except Exception as e:
                logger.error("An error occurred: %s", e)
        
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found!"}, status=400)
    
def delete_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    try:
        category.delete()
        return JsonResponse({'message': 'Record deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': 'Unable to delete record'}, status=500)