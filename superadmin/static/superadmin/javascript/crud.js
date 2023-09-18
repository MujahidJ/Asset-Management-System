document.addEventListener("DOMContentLoaded", function () {
    function updateSerialNumbers() {
        $(".table-container table tbody tr").each(function (index) {
            $(this).find("td:first").text(index + 1);
        });
    }
    function refreshVendorTable() {
        vendorList = $("#vendor-table-container").data("vendor_list");
        console.log(vendorList)
    }

    function refreshAdminTable() {
        AdminList = $("#admin-table-container").data("admin_list");
        console.log(AdminList)
    }
    
    function refreshCategoryTable() {   
        CategoryList = $("#category-table-container").data("category_list");
    }
  
    // Common function to show success message
    function showSuccessMessage(message) {
        Swal.fire({
            icon: 'success',
            title: message,
        });
    }

    // Common function to show error message
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

        console.log("Table Rows Length: ", $tableBody.find("tr").length);

        if ($tableBody.find("tr").length === 0) {
            $tableHead.hide();
            noRecordsMessage();
            console.log('No table.')
        } else {
            $tableHead.show();
        }
    }
    
    // Function to handle admin editing
    function editAdmin(adminId, editAdminURL) {
        console.log(editAdminURL)
        $.ajax({
            url: editAdminURL,
            method: "GET",
            success: function (data) {
                $("#edit_adminname").val(data.adminname);
                $("#edit_adminid").val(data.adminid);

                $("#editAdminModal").modal('show');
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                alert("Unable to fetch admin data.");
                $('#editAdminModal').modal('hide');
            }
        });
    }

    // Function to update an admin
    function updateAdmin(editAdminURL, csrfToken) {
        $.ajax({
            url: editAdminURL,
            method: "POST",
            data: {
                csrfmiddlewaretoken: csrfToken,
                adminid: $("#edit_adminid").val(),
                adminname: $("#edit_adminname").val(),
            },
            success: function (response) {
                if (response.success) {
                    $("#editAdminModal").modal('hide');
                    showSuccessMessage('Admin Updated Successfully');
                    refreshAdminTable();
                } else {
                    showErrorMessage('Unable to update admin record on the server');
                }
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                showErrorMessage('Unable to update admin record');
            }
        });
    }

    // Function to delete an admin
    function deleteAdmin($this, $row, deleteAdminURL, csrfToken) {
        console.log(deleteAdminURL)
        console.log(csrfToken)
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
                        refreshAdminTable()
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

    // Function to handle category editing
    function editCategory(categoryId, editCategoryURL) {
        console.log(editCategoryURL)
        console.log("Editing category with ID:", categoryId);
        console.log("Edit Category URL:", editCategoryURL);
        $.ajax({
            url: editCategoryURL,
            method: "GET",
            success: function (data) {
                $("#edit_category").val(data.category);
                $("#edit_categorytype").val(data.categorytype);

                $("#editCategoryModal").modal('show');

                console.log(data)
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                alert("Unable to fetch category data.");
                $('#editCategoryModal').modal('hide');
            }
        });
    }

    // Function to update a category
    function updateCategory(editCategoryURL, csrfToken) {
        $.ajax({
            url: editCategoryURL,
            method: "POST",
            data: {
                csrfmiddlewaretoken: csrfToken,
                category: $("#edit_category").val(),
                categorytype: $("#edit_categorytype").val(),
            },
            success: function (response) {
                if (response.success) {
                    $("#editCategoryModal").modal('hide');
                    showSuccessMessage('Category Updated Successfully');
                    refreshCategoryTable();
                } else {
                    showErrorMessage('Unable to update category record on the server');
                }
                console.log($("#edit_categorytype").val())
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                showErrorMessage('Unable to update category record');
            }
        });
    }

    // Function to delete a category
    function deleteCategory($this, $row, deleteCategoryURL, csrfToken) {
        console.log(deleteCategoryURL)
        console.log(csrfToken)
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
                        refreshCategoryTable()

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

    // Function to edit a vendor
    function editVendor(vendorId, editVendorURL) {
        $.ajax({
            url: editVendorURL,
            method: "GET",
            success: function (data) {
                console.log("Fetched data:", data);
    
                // Check if this is being logged
                console.log("Inside success callback");
    
                // Check if the country input is being found
                console.log("Country input:", $("#edit_countryInput"));
    
                // Populate the country input
                $("#edit_countryInput").val(data.countries);
    
                // Show the modal
                $("#editVendorModal").modal('show');
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                alert("Unable to fetch vendor data.");
                $('#editVendorModal').modal('hide');
            }
        });
    }
    

    // Function to update a vendor
    function updateVendor(editVendorURL, csrfToken) {
        $.ajax({
            url: editVendorURL,
            method: "POST",
            data: {
                csrfmiddlewaretoken: csrfToken,
                name: $("#edit_name").val(),
                contact: $("#edit_contact").val(),
                countries: $("#edit_countryInput").val(),
                cities: $("#edit_cities").val(),
                description: $("#edit_description").val(),
            },
            success: function (response) {
                if (response.success) {
                    $("#editVendorModal").modal('hide');
                    showSuccessMessage('Vendor Updated Successfully');
                    refreshVendorTable();
                } else {
                    showErrorMessage('Unable to update vendor record on the server');
                }
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                showErrorMessage('Unable to update vendor record');
            }
        });
    }

    const countryInput = document.getElementById("edit_countryInput");
    const countryList  = document.getElementById("edit_countryList");

    countryInput.addEventListener('input', function(){
        countryInput.value = document.querySelector(`option[value='${countryInput.value}']`)?.value || '';
    })


    // Function to delete a vendor
    function deleteVendor($this, $row, deleteVendorURL, csrfToken) {
        console.log(deleteVendorURL)
        console.log(csrfToken)
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
                        refreshVendorTable()
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


    // Add event handlers for admin and category and vendors actions
    $(".edit-admin-btn").click(function () {
        var editAdminURL = $(this).data("edit_admin_url");
        var adminId = $(this).data("admin_id");
        editAdmin(adminId, editAdminURL);
    });

    $("#editAdminForm").submit(function (e) {
        e.preventDefault();
        var editAdminURL = $(this).attr("action");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        updateAdmin(editAdminURL, csrfToken);
    });

    $(".table-container").on("click", ".delete-admin-btn", function () {
        var $this = $(this);
        var $row = $this.closest('tr');
        var deleteAdminURL = $this.data("delete_admin_url");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        deleteAdmin($this, $row, deleteAdminURL, csrfToken);
    });

    $(".edit-category-btn").click(function () {
        var editCategoryURL = $(this).data("edit_category_url");
        var categoryId = $(this).data("category_id");
        editCategory(categoryId, editCategoryURL);
    });

    $("#editCategoryForm").submit(function (e) {
        e.preventDefault();
        var editCategoryURL = $(this).attr("action");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        updateCategory(editCategoryURL, csrfToken);
    });

    $(".table-container").on("click", ".delete-category-btn", function () {
        var $this = $(this);
        var $row = $this.closest('tr');
        var deleteCategoryURL = $this.data("delete_category_url");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        deleteCategory($this, $row, deleteCategoryURL, csrfToken);
    });
    
        // Add event handlers for vendor actions
        $(".edit-vendor-btn").click(function () {
            var editVendorURL = $(this).data("edit_vendor_url");
            var vendorId = $(this).data("vendor_id");
            editVendor(vendorId, editVendorURL);
        });
    
        $("#editVendorForm").submit(function (e) {
            // e.preventDefault();
            var editVendorURL = $(this).attr("action");
            var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
            updateVendor(editVendorURL, csrfToken);
        });
    
        $(".delete-vendor-btn").click(function () {
            var $this = $(this);
            var $row = $this.closest('tr');
            var deleteVendorURL = $this.data("delete_vendor_url");
            var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
            deleteVendor($this, $row, deleteVendorURL, csrfToken);
        });


});
