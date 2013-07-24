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

Handlebars.registerHelper('toLowerCase', function(value) {
    if(value) {
        return new Handlebars.SafeString(value.toLowerCase());
    } else {
        return '';
    }
});

Handlebars.registerHelper('detailedStatus', function(value) {
    if(value) {
        var detailedStatus = "";
        switch(value){
            case 'OK' : detailedStatus = 'El servidor se encuentra activo y sin problemas';
            break;

            case 'DOWN' : detailedStatus = 'El servidor se encuentra abajo debido a un mantenimiento programado';
            break;

            case 'FAIL' : detailedStatus = 'El servidor se encuentra debido a una falla';
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
            constructedResource = resource;
        }
        
        return new Handlebars.SafeString(constructedResource);
    } 
});