$(document).ready(function() {

    $(document).on({
        ajaxStart: function() { $("body").addClass("loading"); },
        ajaxStop: function() { $("body").removeClass("loading"); }    
    });

    $("input#inpFile").change( function(){
        const file = $("input#inpFile").prop("files")[0];
        $(".blockquote").hide();

        if (file) {
            const reader = new FileReader();

            $("span#defaultText").hide();
            $("img#imagePreview").show();

            reader.addEventListener("load", function() {
                $("img#imagePreview").attr("src", this.result);
            });

            reader.readAsDataURL(file);
        } else {
            $("span#defaultText").show();
            $("img#imagePreview").hide();
        }

    });

    $("button#generateCaption").click( function() {
        const file = $("input#inpFile").prop("files")[0];

        if (file) {
            var formdata = new FormData()
            formdata.append('image', file)
            $.ajax({
                method : 'POST',
                processData : false,
                contentType : false,
                url : '/generateCaption',
                data : formdata,
                success : function(res){
                    $("p#generatedCaption").text(res["caption"])
                    $(".blockquote").show();
                }
            })
        } else {
            alert("Please provide an image")
        }

    });

});