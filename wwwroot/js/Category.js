﻿function Delete(url) {
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
                    location.reload();
                }
            });
        }
    }));
}