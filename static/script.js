$(document).ready(function() {

    $("p#outputText").hide();

    $(document).on({
        ajaxStart: function() { $("body").addClass("loading"); },
        ajaxStop: function() { $("body").removeClass("loading"); }    
    });

    $("input#inpFile").change( function(){
        const file = $("input#inpFile").prop("files")[0];
        $("p#outputText").hide();

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

    $("button#generateCount").click( function() {
        const file = $("input#inpFile").prop("files")[0];

        if (file) {
            var formdata = new FormData()
            formdata.append('image', file)
            $.ajax({
                method : 'POST',
                processData : false,
                contentType : false,
                url : '/cellcount-image',
                data : formdata,
                success : function(res){
                    $("span#cellCount").text(res["count"])
                    $("p#outputText").show();
                }
            })
        } else {
            alert("Please provide an image")
        }

    });

});