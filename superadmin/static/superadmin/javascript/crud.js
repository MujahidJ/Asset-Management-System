document.addEventListener("DOMContentLoaded", function () {
    function updateSerialNumbers() {
        $(".table-container table tbody tr").each(function (index) {
            $(this).find("td:first").text(index + 1);
        });
    }

    function showSuccessMessage(message) {
        Swal.fire({
            icon: 'success',
            title: message,
        });
    }

    function showErrorMessage(message) {
        Swal.fire({
            icon: 'error',
            title: message,
        });
    }
  
    function noRecordsMessage(){
        var noRecordsElement = document.querySelector(".no-records-message");

        if (noRecordsElement){
        noRecordsElement.style.display = "block";
        }
    }

    function updateTableVisibility() {
        var $tableContainer = $(".table-container");
        var $table = $tableContainer.find("table");
        var $tableBody = $table.find("tbody");
        var $tableHead = $table.find("thead");

        if ($tableBody.find("tr").length === 0) {
            $tableHead.hide();
            noRecordsMessage();
        } else {
            $tableHead.show();
        }
    }
    

    function editAdmin(AdminId, editAdminURL) {
        $.ajax({
            url: editAdminURL,
            method: "GET",
            success: function (data) {
    
                $("#edit_adminid").val(data.adminid);
                $("#edit_adminname").val(data.adminname);

                $("#editAdminModal").modal('show');
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                alert("Unable to fetch Admin data.");
                $('#editAdminModal').modal('hide');
            }
        });
    }

    function updateAdmin(updateAdminURL, csrfToken) {
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken); 
            },
        });
    
        $.ajax({
            url: updateAdminURL,
            method: "POST",
            dataType: 'json',
            headers: {
                "Accept": "application/json"
            },
            contentType: "application/json",
            data: JSON.stringify({
                adminid: $("#edit_adminid").val(),
                adminname: $("#edit_adminname").val(),
            }),
            success: function (response) {
                if (response.success) {
                    $("#editAdminModal").modal('hide');
                    showSuccessMessage('Admin Updated Successfully');
    
                    
                    $(".admin-table-container").html(response.admin_table_html);
                } else {
                    showErrorMessage('Unable to update admin record on the server');
                }
            },
            error: function (xhr, status, error) {
                console.log("AJAX Error:", xhr.status, error);
                showErrorMessage('Unable to update admin record');
            }
        });
    }

    function deleteAdmin($this, $row, deleteAdminURL, csrfToken) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                var $table = $(".table-container table tbody");

                $.ajax({
                    url: deleteAdminURL,
                    method: "DELETE",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-CSRFToken", csrfToken);
                    },
                    success: function () {
                        $row.remove();
                        updateSerialNumbers();
                        showSuccessMessage('Admin Deleted Successfully');
                        updateTableVisibility()

                    },
                    error: function (error) {
                        console.log("AJAX Error:", error);
                        showErrorMessage('Unable to delete admin record');
                    },
                });
            }
        });
        
    }


function editCategory(categoryId, editCategoryURL) {
    $.ajax({
        url: editCategoryURL,
        method: "GET",
        success: function (data) {
            $("#edit_category").val(data.category);
            $("#edit_categorytype").val(data.categorytype);
            $("#editCategoryModal").modal('show');
        },
        error: function (error) {
            console.log("AJAX Error:", error);
            alert("Unable to fetch category data.");
            $('#editCategoryModal').modal('hide');
        }
    });
}


function updateCategory(updateCategoryURL, csrfToken) {

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrfToken);
        },
    });

    $.ajax({
        url: updateCategoryURL,
        method: "POST",
        dataType: 'json',
        headers: {
            "Accept": "application/json"
        },
        contentType: "application/json",
        data: JSON.stringify({
            category: $("#edit_category").val(),
            categorytype: $("#edit_categorytype").val(),
        }),
        success: function (response) {
            
            if (response.success) {
                $("#editCategoryModal").modal('hide');
                showSuccessMessage('Category Updated Successfully');

          $(".category-table-container").html(response.category_table_html);
   
            } else {
                showErrorMessage('Unable to update category record on the server');
            }
        },
        error: function (xhr, status, error) {
            console.log("AJAX Error:", xhr.status, error);
            showErrorMessage('Unable to update category record');
        }
    });
}

    function deleteCategory($this, $row, deleteCategoryURL, csrfToken) {
       
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                var $table = $(".table-container table tbody");

                $.ajax({
                    url: deleteCategoryURL,
                    method: "DELETE",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-CSRFToken", csrfToken);
                    },
                    success: function () {
                        $row.remove();
                        updateSerialNumbers();
                        showSuccessMessage('Category Deleted Successfully');
                       

                        updateTableVisibility()
                    },
                    error: function (error) {
                        console.log("AJAX Error:", error);
                        showErrorMessage('Unable to delete category record');
                    },
                });
            }
        });
    }

    function editVendor(vendorId, editVendorURL) {
        $.ajax({
            url: editVendorURL,
            method: "GET",
            success: function (data) {

                $("#edit_name").val(data.name)
                $("#edit_contact").val(data.contact)
                $("#edit_countryInput").val(data.countries)
                $("#edit_cityInput").val(data.cities)
                $("#edit_description").val(data.description)
                $("#editVendorModal").modal('show');
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                alert("Unable to fetch vendor data.");
                $('#editVendorModal').modal('hide');
            }
        });
    }
    
    function updateVendor(updateVendorURL, csrfToken) {
       
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken); 
            },
        });
    
      
    
        $.ajax({
            url: updateVendorURL,
            method: "POST",
            dataType: 'json',
            headers: {
                "Accept": "application/json"
            },
            contentType: "application/json",
            data: JSON.stringify({
                name: $("#edit_name").val(),
                contact: $("#edit_contact").val(),
                countries: $("#edit_countryInput").val(),
                cities: $("#edit_cityInput").val(),
                description: $("#edit_description").val(),
            }),
            success: function (response) {
               
                if (response.success) {
                    $("#editVendorModal").modal('hide');
                    showSuccessMessage('Vendor Updated Successfully');
                    
                  
                    $(".vendor-table-container").html(response.vendor_table_html);
                } else {
                    showErrorMessage('Unable to update vendor record on the server');
                }
            },
            error: function (xhr, status, error) {
                console.log("AJAX Error:", xhr.status, error);
                showErrorMessage('Unable to update vendor record');
            }
        });
    }
    
    


    function deleteVendor($this, $row, deleteVendorURL, csrfToken) {
      
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                var $table = $(".table-container table tbody");

                $.ajax({
                    url: deleteVendorURL,
                    method: "DELETE",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-CSRFToken", csrfToken);
                    },
                    success: function () {
                        $row.remove();
                        updateSerialNumbers();
                        showSuccessMessage('Vendor Deleted Successfully');
                        updateTableVisibility()
                    },
                    error: function (error) {
                        console.log("AJAX Error:", error);
                        showErrorMessage('Unable to delete vendor record');
                    },
                });
            }
        });
    }
 
    var updateAdminURL = $(this).closest(".modal").find(".edit-admin-btn").data("edit_admin_url");

    $(".edit-admin-btn").click(function () {
        var editAdminURL = $(this).data("edit_admin_url");
        var adminId = $(this).data("admin_id");
        editAdmin(adminId, editAdminURL);
    
        updateAdminURL = editAdminURL;
    });
    
    $("#editAdminForm").submit(function (e) {
        e.preventDefault();
        var editAdminURL = $(this).attr("action");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        updateAdmin(editAdminURL, csrfToken);
    });
    
    
    $("#updateAdminButton").click(function (e) {
        e.preventDefault();
        var csrfToken =  $("input[name=csrfmiddlewaretoken]").val();
    
        updateAdmin(updateAdminURL, csrfToken);
    });
    

    $(".table-container").on("click", ".delete-admin-btn", function () {
        var $this = $(this);
        var $row = $this.closest('tr');
        var deleteAdminURL = $this.data("delete_admin_url");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        deleteAdmin($this, $row, deleteAdminURL, csrfToken);
    });

   
    var updateCategoryURL = $(this).closest(".modal").find(".edit-category-btn").data("edit_category_url");


    $(".edit-category-btn").click(function () {
        var editCategoryURL = $(this).data("edit_category_url");
        var categoryId = $(this).data("category_id");
        editCategory(categoryId, editCategoryURL);
    
        updateCategoryURL = editCategoryURL;
    });
    
    $("#editCategoryForm").submit(function (e) {
        e.preventDefault();
        var editCategoryURL = $(this).attr("action");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        updateCategory(editCategoryURL, csrfToken);
    });
    
    
    $("#updateCategoryButton").click(function (e) {
        e.preventDefault();
        var csrfToken =  $("input[name=csrfmiddlewaretoken]").val();
    
        updateCategory(updateCategoryURL, csrfToken);
    });

    $(".table-container").on("click", ".delete-category-btn", function () {
        var $this = $(this);
        var $row = $this.closest('tr');
        var deleteCategoryURL = $this.data("delete_category_url");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        deleteCategory($this, $row, deleteCategoryURL, csrfToken);
    });
    
    var updateVendorURL = $(this).closest(".modal").find(".edit-vendor-btn").data("edit_vendor_url");

       
        $(".edit-vendor-btn").click(function () {
            var editVendorURL = $(this).data("edit_vendor_url");
            var vendorId = $(this).data("vendor_id");
            editVendor(vendorId, editVendorURL);

            updateVendorURL = editVendorURL;
        });
    
        $("#editVendorForm").submit(function (e) {
            e.preventDefault();
            var editVendorURL = $(this).attr("action");
            var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
            updateVendor(editVendorURL, csrfToken);
        });


        $("#updateVendorButton").click(function (e) {
            e.preventDefault();
            var csrfToken =  $("input[name=csrfmiddlewaretoken]").val();
        
            updateVendor(updateVendorURL, csrfToken);
        });


        $(".table-container").on("click", ".delete-vendor-btn", function () {
            var $this = $(this);
            var $row = $this.closest('tr');
            var deleteVendorURL = $this.data("delete_vendor_url");
            var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
            deleteVendor($this, $row, deleteVendorURL, csrfToken);
        });


});
