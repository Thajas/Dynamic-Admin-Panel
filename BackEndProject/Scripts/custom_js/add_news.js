"use strict";
$(document).ready(function() {
    $(".tags_options").select2({
        tags: true,
        tokenSeparators: [',', ' ']
    });


    $('.datetimepicker4').datetimepicker({

        keepOpen: false,
        useCurrent: false,
        minDate: new Date().setHours(0, 0, 0, 0)
    });
    var date = new Date();
    date.setDate(date.getDate() - 1);
    $('.datetimepicker4').datetimepicker({
        startDate: date
    });
    $('.datetimepicker4').on("dp.change", function(e) {
        $('#add_news_form').bootstrapValidator('revalidateField', 'time_from');
    });

    function validateEditor() {
        // Revalidate the content when its value is changed by Summernote
        $('#add_news_form').bootstrapValidator('revalidateField', 'content');
    };
    $('#add_news_form')
        .bootstrapValidator({
            fields: {
                title: {
                    validators: {
                        notEmpty: {
                            message: 'The title is required and cannot be empty'
                        }
                    }
                },
                category: {
                    validators: {
                        notEmpty: {
                            message: 'The category is required and cannot be empty'
                        }
                    }
                },
                time_from: {
                    validators: {
                        notEmpty: {
                            message: 'The date is required'
                        }
                    }
                },
                content: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function(value, validator) {
                                var code = $('[name="content"]').code();
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e) {
           // e.preventDefault();
            swal({
                title: "Success.",
                text: "Successfully Submitted",
                type: "success",
                allowOutsideClick: false
            }).then(function () {
                window.location.reload();
            });
        }).on('summernote.change', function() {
            validateEditor();
            $('#add_news_form').bootstrapValidator('revalidateField', 'content');
        })
        .find('[name="content"]').summernote({
            height: 200
        })
        .change(function(e) {
            alert("sadjsakdj");
            $('#add_news_form').bootstrapValidation('revalidateField', 'tags');
        }).find('[name="tags"]').select2({
            tags: true
        })
        // $('#activate').on('ifChanged', function(event){
        //     $('#add_news_form   ').bootstrapValidator('revalidateField', $('#activate'));
        // });
    $('input[type=reset]').on('click', function() {
        $(".note-editable").empty();
        $(".select2-selection__choice").empty().css("border", "0");
        $('#add_news_form').bootstrapValidator("resetForm");
        if (($(".fill_it").empty()) && ($(".note-editable").empty()) && ($(".select2-selection__choice").empty())) {
            $("input[type=submit]").attr('disabled', 'disabled');
        }
    });
});