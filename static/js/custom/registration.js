function register_now(c,a,d){var b;$.ajax({url:"/internal/ajax/registernow/",method:"get",async:false,cache:false,data:{company:c,id:a,date:d,method:"register"},success:function(f,e,g){b=f},error:function(g,e,f){b="fail"}});return b}function set_registration_key(a){var b;$.ajax({url:"/internal/ajax/registernow/",method:"get",async:false,cache:false,data:{id:a,method:"set_registration"},success:function(d,c,e){b=d},error:function(e,c,d){b=false}});return b}$(document).ready(function(){var e=$("#id_required").val();var a=$("#id_code").val();var f=$("#id_date").val();var b=$("#id_company").val();var c=$("#called_from").val();$("#reg-message").css("visibility","visible");if(e=="yes"){$("#reg-message").show()}else{$("#reg-message").hide()}var d=document.getElementById("regnow");if(d){d.onclick=function(){var g=register_now(b,a,f);if(g=="too_many_regs"){alert(gettext("Registration failed.  Too many machines registered.  Please contact support@device42.com"))}else{if(g=="success"){res=set_registration_key(a);if(res){$("#reg-message").hide();alert(gettext("You are now registered.  Thank you!"));if(c=="update"){$("#content-main").show()}}else{alert(gettext("Registration failed.  Please send an email to support@device42.com with this code")+a)}}else{alert(gettext("Registration failed.  Please send an email to support@device42.com with this code")+a)}}}}$("#search").focus()});