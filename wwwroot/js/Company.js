﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});


function loadDataTable() {
    dataTable = $("#tblData").DataTable({
        "ajax": {
            "url": "/Admin/Company/GetAll"
        },
        "columns": [
            { "data": "name" },
            { "data": "streetAddress" },
            { "data": "city" },
            { "data": "state" },
            { "data": "postalCode" },
            { "data": "phoneNumber" },
            {"data": "isAuthorizedCompany"},
            {
                "data": "companyID",
                "render": function (data) {
                    return `
                    <div class="text-center">
                        <a href="/Admin/Company/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a onClick=Delete("/Admin/Company/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer">
                            <i class="fas fa-trash-alt"></i> 
                        </a>
                    </div>
                    `;
                }, "width": "40%"
            }
        ]
    });
}

function Delete(url) {
    swal({
        title: "Are you sure you want to  Delete?",
        text: "You will not be able to restore the data!",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    }));
}