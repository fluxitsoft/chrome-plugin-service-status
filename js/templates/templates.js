(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['error-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<li>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n	";
  return buffer;
  }

  buffer += "<h3>Estado de los servicios de FluxIT</h3>\n<ul class=\"errors\">\n	";
  stack1 = helpers.each.call(depth0, depth0.errors, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
templates['services-list-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n	<li class=\"service\" title=\"Click para obtener mas informacion\">\n		<i class='status ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toLowerCase || depth0.toLowerCase),stack1 ? stack1.call(depth0, depth0.status, options) : helperMissing.call(depth0, "toLowerCase", depth0.status, options)))
    + "' title=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.detailedStatus || depth0.detailedStatus),stack1 ? stack1.call(depth0, depth0.status, options) : helperMissing.call(depth0, "detailedStatus", depth0.status, options)))
    + "\"></i>\n		"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " [ "
    + escapeExpression(((stack1 = depth0.time),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.metricType || depth0.metricType),stack1 ? stack1.call(depth0, depth0.type, options) : helperMissing.call(depth0, "metricType", depth0.type, options)))
    + " ] \n		<div class=\"service-detail hidden\">\n			<ul>\n				<li><strong>Service Type:</strong> "
    + escapeExpression(((stack1 = depth0.type),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </li>\n				<li><strong>Estado:</strong> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.detailedStatus || depth0.detailedStatus),stack1 ? stack1.call(depth0, depth0.status, options) : helperMissing.call(depth0, "detailedStatus", depth0.status, options)))
    + " </li>\n				";
  stack2 = helpers['if'].call(depth0, depth0.message, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n			</ul>\n		</div>\n	</li>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    				<li><strong>Mensaje:</strong> "
    + escapeExpression(((stack1 = depth0.message),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n  				";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n  		<div class=\"no-asociated-services\">No existen servicios asociados</div>\n	";
  }

  buffer += "<h3>Estado de los servicios de FluxIT</h3>\n<ul class=\"services-statuses\">\n	";
  stack1 = helpers.each.call(depth0, depth0.services, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
})();