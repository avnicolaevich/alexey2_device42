var gray,grid,chart;var theme=Highcharts.gray;var highchartsOptions=Highcharts.setOptions(theme);var charts={},elements={},chart_type;function get_object_trend(b,e,a){var d;$.ajax({url:"/internal/ajax/miscellaneous/",method:"get",async:false,cache:false,data:{request_type:"object_trend",time_unit:e,num_time_units:a,content_type:b},success:function(g,f,h){d=g},error:function(h,f,g){console.log(h.responseText);d=-1}});return d}function CreateColumnChart(f,l,b,g,j,e,a){for(var h=0;h<b.length;h++){var d=b[h].indexOf("-");if(d>-1){b[h]=b[h].substring(0,d)+"-\n"+b[h].substring(d+1)}}var k=new Highcharts.Chart({chart:{type:"column",renderTo:f,height:165,width:355,plotBackgroundColor:null,plotBorderWidth:null,plotShadow:false,marginBottom:b[0].length>6?40:25},colors:a,title:{text:""},yAxis:{title:{text:j}},xAxis:{categories:b,labels:{rotation:0,align:"center",style:{fontSize:"12px",fontFamily:"sans-serif",whiteSpace:"pre"}}},tooltip:{headerFormat:"",pointFormat:"{point.category}: {point.y}"},plotOptions:{column:{size:"50%",allowPointSelect:true,cursor:"pointer"}},legend:{enabled:false},credits:{enabled:false},series:[{data:g,dataLabels:{formatter:function(){if(this.y>e){return this.y}},enabled:true,color:"#FFFFFF",align:"center",x:0,y:15,style:{fontSize:"10px",fontFamily:"Verdana, sans-serif",textShadow:"0 0 2px black"}}}]});return k}function get_table_data(a){var b;$.ajax({url:"/internal/ajax/miscellaneous/",method:"get",async:false,cache:false,data:{request_type:"table_data",type:a},success:function(e,d,f){b=e},error:function(f,d,e){alert(f.responseText);b=-1}});return b}function InitializeChart(f,v){$("#myDashboard").sDashboard("addWidget",{widgetId:"widget_"+v.element,widgetTitle:v.title,widgetContent:$("#"+v.element)});theme=Highcharts.gray;highchartsOptions=Highcharts.setOptions(theme);var d,n;var a=v.element;var o=v.type;var x=v.title;var j=v.object;var u=[];var e=[];var t=v.yaxis;var m=v.time;var b=v.numtime;var q=v.color;if(o=="object_trend"){var w=get_object_trend(j,m,b);if(w==-1){return}var l=w[0];if(l.length==0){return}var n=w[1];var g=0;for(dt in l){var k=[];k.push(dt);k.push(l[dt]);u.push(k);if(l[dt]>g){g=l[dt]}}var r=g*0.3;var h=[];h.push(q);d=CreateColumnChart(a,x,n,u,t,r,h)}charts[f]=d;elements[f]=a}function InitializeTable(h,g){var b=g.element;if(b=="last_10_changes"||b=="queued_tasks"){var d=get_table_data(b)}else{return -1}var f=JSON.parse(d);if(!f||f==-1){return -1}var e={};e.aoColumns=[];for(i=0;i<Math.floor(f.nfields);i++){dict={};dict.sTitle=f.names[i];e.aoColumns[i]=dict}e.aaData=f.data;var a=$("#myDashboard").sDashboard("addWidget",{widgetId:"widget_"+g.element,widgetTitle:g.title,widgetContent:$("#"+g.element),widgetType:"table",widgetContent:e})}function DrillDown(b){var a=get_devid_for_name(b);if(a!=-1){var d=window.open();var e="/admin/rackraj/device/energy/";d.location.href=e+a.toString()+"/";d.focus()}}function get_devid_for_name(b){var a;$.ajax({url:"/internal/ajax/power/",method:"get",async:false,cache:false,data:{name:b,request_type:"get_devid_for_name"},success:function(e,d,f){a=e},error:function(f,d,e){alert(f.responseText)}});return a}function RecordWidgetVisibility(){var a=$("#myDashboard").sDashboard("getDashboardData");var b=[];for(i in a){b.push(a[i].widgetId)}$.ajax({url:"/internal/ajax/miscellaneous/",method:"get",async:false,cache:false,data:{visible_objs:JSON.stringify(b),request_type:"record_widget_visibility"},error:function(f,d,e){alert(f.responseText)}})}function RecordWidgetSortOrder(a){var b=[];for(i in a){b.push(a[i].widgetId)}$.ajax({url:"/internal/ajax/miscellaneous/",method:"get",async:false,cache:false,data:{sort_order:JSON.stringify(b),request_type:"record_widget_sort_order"},error:function(f,d,e){alert(f.responseText)}})}function get_dashboard_parameters(){var a;$.ajax({url:"/internal/ajax/miscellaneous/",method:"get",async:false,cache:false,data:{request_type:"dashboard_parameters"},success:function(d,b,e){a=d},error:function(e,b,d){alert(e.responseText);a=-1}});return a}function is_element_visible(a,b){for(c in b){var d=b[c];if(d.element==a){return true}}return false}$(document).ready(function(){$("#s").focus();var a=[];$("#myDashboard").sDashboard({dashboardData:a});var d=get_dashboard_parameters();var f=0;for(p in d){var e=d[p];if(e.widget_type=="table"){InitializeTable(f,e);f+=1}else{InitializeChart(p,e)}}$("#myDashboard").bind("sdashboardrowclicked",function(j,h){var g=h.selectedWidgetId.toString();if(g.indexOf("last_10_changes")){window.open("/admin/d42webhooks/auditlog/","_self")}});$("#myDashboard tbody tr").live("click",function(){var g=this.getAttribute("value");if(g!=null){var h=window.open(g,"_self")}});$("#myDashboard").bind("sdashboardorderchanged",function(h,g){RecordWidgetSortOrder(g.sortedDefinitions)});$("#myDashboard").bind("click",function(h,g){RecordWidgetVisibility()});$("span").each(function(){var g=$(this).context.title;if(g=="Maximize"||g=="Close"){$(this).hide()}});if(is_element_visible("bldgstats",d)){var b={type:"GET",url:"/api/1.0/get_dashboard_u/",cache:false,success:processJson};$.ajax(b);$("#bldgstats").css("visibility","visible")}$("#ipstats").css("visibility","visible");$("#devicestats").css("visibility","visible")});function processJson(d,a,b){$("#total").html(d.racktu+"U");$("#used").html(d.used+"U");$("#free").html(d.freeu+"U")}$(document).unload(function(){for(var a in charts){charts[a].destroy()}});