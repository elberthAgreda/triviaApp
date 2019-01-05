$(document).ready(function(){
    $('.tabs').tabs();
    $('.collapsible').collapsible();

    $('li.tab a').removeClass( 'active' );
    setTimeout(function(){ $('li.indicator').removeAttr( 'style' ); }, 1000);

    $('#showInstruciones').click(function(){
        $('.extras-tbs').css("display","none")
        $('#instrucciones').css("display","block");
        $('li.indicator').removeAttr( 'style' );
        $('li.tab a').removeClass( 'active' );
    });
    $('.tabs a').click(function(){
        $('.extras-tbs').css("display","block");
        $('#instrucciones').css("display","none");
    });

    $('.showTB').click();
});