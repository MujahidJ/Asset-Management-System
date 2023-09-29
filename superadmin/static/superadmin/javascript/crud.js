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

                $("#editAdminmodal").modal('show');
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                alert("Unable to fetch Admin data.");
                $('#editAdminmodal').modal('hide');
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
                    $("#editAdminmodal").modal('hide');
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


function editCatemodalry(catemodalryId, editCatemodalryURL) {
    $.ajax({
        url: editCatemodalryURL,
        method: "GET",
        success: function (data) {
            $("#edit_catemodalry").val(data.catemodalry);
            $("#edit_catemodalrytype").val(data.catemodalrytype);
            $("#editCatemodalrymodal").modal('show');
        },
        error: function (error) {
            console.log("AJAX Error:", error);
            alert("Unable to fetch catemodalry data.");
            $('#editCatemodalrymodal').modal('hide');
        }
    });
}


function updateCatemodalry(updateCatemodalryURL, csrfToken) {

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrfToken);
        },
    });

    $.ajax({
        url: updateCatemodalryURL,
        method: "POST",
        dataType: 'json',
        headers: {
            "Accept": "application/json"
        },
        contentType: "application/json",
        data: JSON.stringify({
            catemodalry: $("#edit_catemodalry").val(),
            catemodalrytype: $("#edit_catemodalrytype").val(),
        }),
        success: function (response) {
            
            if (response.success) {
                $("#editCatemodalrymodal").modal('hide');
                showSuccessMessage('Catemodalry Updated Successfully');

          $(".catemodalry-table-container").html(response.catemodalry_table_html);
   
            } else {
                showErrorMessage('Unable to update catemodalry record on the server');
            }
        },
        error: function (xhr, status, error) {
            console.log("AJAX Error:", xhr.status, error);
            showErrorMessage('Unable to update catemodalry record');
        }
    });
}

    function deleteCatemodalry($this, $row, deleteCatemodalryURL, csrfToken) {
       
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
                    url: deleteCatemodalryURL,
                    method: "DELETE",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-CSRFToken", csrfToken);
                    },
                    success: function () {
                        $row.remove();
                        updateSerialNumbers();
                        showSuccessMessage('Catemodalry Deleted Successfully');
                       

                        updateTableVisibility()
                    },
                    error: function (error) {
                        console.log("AJAX Error:", error);
                        showErrorMessage('Unable to delete catemodalry record');
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
                $("#editVendormodal").modal('show');
            },
            error: function (error) {
                console.log("AJAX Error:", error);
                alert("Unable to fetch vendor data.");
                $('#editVendormodal').modal('hide');
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
                    $("#editVendormodal").modal('hide');
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

   
    var updateCatemodalryURL = $(this).closest(".modal").find(".edit-catemodalry-btn").data("edit_catemodalry_url");


    $(".edit-catemodalry-btn").click(function () {
        var editCatemodalryURL = $(this).data("edit_catemodalry_url");
        var catemodalryId = $(this).data("catemodalry_id");
        editCatemodalry(catemodalryId, editCatemodalryURL);
    
        updateCatemodalryURL = editCatemodalryURL;
    });
    
    $("#editCatemodalryForm").submit(function (e) {
        e.preventDefault();
        var editCatemodalryURL = $(this).attr("action");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        updateCatemodalry(editCatemodalryURL, csrfToken);
    });
    
    
    $("#updateCatemodalryButton").click(function (e) {
        e.preventDefault();
        var csrfToken =  $("input[name=csrfmiddlewaretoken]").val();
    
        updateCatemodalry(updateCatemodalryURL, csrfToken);
    });

    $(".table-container").on("click", ".delete-catemodalry-btn", function () {
        var $this = $(this);
        var $row = $this.closest('tr');
        var deleteCatemodalryURL = $this.data("delete_catemodalry_url");
        var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
        deleteCatemodalry($this, $row, deleteCatemodalryURL, csrfToken);
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
