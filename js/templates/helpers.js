/*//////////////////////////////
//// Handlebars Helpers ///////
*/////////////////////////////

Handlebars.getTemplate = function(name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url : 'templatesfolder/' + name + '.handlebars',
            success : function(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async : false
        });
    }
    return Handlebars.templates[name];
};

function linkenize(link) {
    if (link != '') {
        link = (link.indexOf('://') == -1) ? 'http://' + link : link;
    }
      
    return link;
}

Handlebars.registerHelper('toLowerCase', function(value) {
    if(value) {
        return new Handlebars.SafeString(value.toLowerCase());
    } else {
        return '';
    }
});

Handlebars.registerHelper('detailedStatus', function(value) {
    if(value) {
        var detailedStatus = "",
            upperValue = value.toUpperCase();

        switch(upperValue){
            case 'OK' :
            case 'SUCCESS' :
                detailedStatus = 'El servidor se encuentra activo y sin problemas';
            break;

            case 'DOWN' : detailedStatus = 'El servidor se encuentra abajo debido a un mantenimiento programado';
            break;

            case 'ERROR' :
            case 'FAILURE' :
             detailedStatus = 'El servidor se encuentra caido debido a una falla';
            break;
            default: detailedStatus = "";
        }
        return new Handlebars.SafeString(detailedStatus);
    } else {
        return '';
    }
});

Handlebars.registerHelper('constructResource', function(resource) {
    var constructedResource = "";

    if(resource) {
        if(re_weburl.test(resource)){
           constructedResource = '<a href="' + resource + '" class="resource external_link" title="Abrir Recurso: ' + resource + '">' + resource + '</a>';    
        }else{
            var linkedResource = linkenize(resource);
            constructedResource = '<a href="' + linkedResource + '" class="resource external_link" title="Abrir Recurso: ' + linkedResource + '">' + linkedResource + '</a>';    
        }
        
        return new Handlebars.SafeString(constructedResource);
    } 
});