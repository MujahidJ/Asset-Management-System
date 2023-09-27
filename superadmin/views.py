from django.shortcuts import render, redirect
from .models import *
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.urls import reverse
import json
from django.template.loader import render_to_string


import logging

logger = logging.getLogger(__name__)

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

            data = {
                "adminid": admin.adminid,
                "adminname": admin.adminname,
            }
            return JsonResponse(data)
    
        elif request.method == "POST":
            try:
                post_data = json.loads(request.body.decode("utf-8"))
                if 'adminid' in post_data:
                    admin.adminid = post_data.get("adminid")
                    admin.adminname = post_data.get("adminname")
     
                    admin.save()

                response_data = {'success': True}
             
                admin_table_html = render_to_string('superadmin/admin_table.html', {'Administrators': Admin.objects.all()})
                response_data['admin_table_html'] = admin_table_html
                
                return JsonResponse(response_data, content_type="application/json")

            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON data in the request."}, status=400)

        return JsonResponse({"error": "Invalid data in the request."}, status=400)

    except Admin.DoesNotExist:
        return JsonResponse({"error": "Vendor not found!"}, status=400)


def delete_admin(request, admin_id):
    try:
        Admin.objects.get(id=admin_id).delete()
        return JsonResponse({'message': 'Record deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': 'Unable to delete record'}, status=500)
        

  
def vendors(request):
    Vendors = Vendor.objects.all()
   
   
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
       
            data = {
                "name": vendor.name,
                "contact": vendor.contact,
                "countries": vendor.countries,
                "cities": vendor.cities,
                "description": vendor.description
            }
            return JsonResponse(data)
    
        elif request.method == "POST":
            try:
                post_data = json.loads(request.body.decode("utf-8"))
                if 'name' in post_data:
                    vendor.name = post_data.get("name")
                    vendor.contact = post_data.get("contact")
                    vendor.countries = post_data.get("countries")
                    vendor.cities = post_data.get("cities")
                    vendor.description = post_data.get("description") or 'No description available'
                    vendor.save()

                response_data = {'success': True}
                
                vendor_table_html = render_to_string('superadmin/vendor_table.html', {'Vendors': Vendor.objects.all()})
                response_data['vendor_table_html'] = vendor_table_html
                
                return JsonResponse(response_data, content_type="application/json")

            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON data in the request."}, status=400)

        return JsonResponse({"error": "Invalid data in the request."}, status=400)

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
       

    return render(request, "superadmin/categories.html", {
        "Categories":Categories,
    })

def edit_category(request, category_id):
    try:
        category = get_object_or_404(Category, pk=category_id)

        if request.method == "GET":
           
            data = {
                "category": category.category,
                "categorytype": category.categorytype
            }
            return JsonResponse(data)
    
        elif request.method == "POST":
            try:
                post_data = json.loads(request.body.decode("utf-8"))
                if 'category' in post_data:
                    category.category = post_data.get("category")
                    category.categorytype = post_data.get("categorytype")
                    
                category.save()
                        
                response_data = {'success': True}
                
                category_table_html = render_to_string('superadmin/category_table.html', {'Categories': Category.objects.all()})
                response_data['category_table_html'] = category_table_html
                
                return JsonResponse(response_data, content_type="application/json")

            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON data in the request."}, status=400)

        return JsonResponse({"error": "Invalid data in the request."}, status=400)

    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found!"}, status=400)



def delete_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    try:
        category.delete()
        return JsonResponse({'message': 'Record deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': 'Unable to delete record'}, status=500)