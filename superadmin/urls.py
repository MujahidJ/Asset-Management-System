from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index, name="home"),
    path("administrators/", views.administrators, name="administrators"),
    path("vendors/", views.vendors, name="vendors"),
    path("categories/", views.categories, name="categories"),
    path("edit_vendor/<int:vendor_id>/", views.edit_vendor, name="edit_vendor"),
    path("delete_vendor/<int:vendor_id>/", views.delete_vendor, name="delete_vendor"),
    path("edit_category/<int:category_id>/", views.edit_category, name="edit_category"),
    path("delete_category/<int:category_id>/", views.delete_category, name="delete_category"),
    path("edit_admin/<int:admin_id>/", views.edit_admin, name="edit_admin"),
    path("delete_admin/<int:admin_id>/", views.delete_admin, name="delete_admin"),
]