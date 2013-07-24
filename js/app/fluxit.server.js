if (typeof FluxIT == "undefined" || !FluxIT) {
	/**
	 * The FluxIT global namespace object.  If SIG2 is already defined, the
	 * existing FluxIT object will not be overwritten so that defined
	 * namespaces are preserved.
	 * @class FluxIT
	 * @static
	 */
	var FluxIT = {};
};

/**
 * Returns the namespace specified and creates it if it doesn't exist
 * <pre>
 * FluxIT.namespace("property.package");
 * FluxIT.namespace("FluxIT.property.package");
 
 * </pre>
 * Either of the above would create FluxIT.property, then
 * FluxIT.property.package
 *
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 * <pre>
 * FluxIT.namespace("really.long.nested.namespace");
 * </pre>
 * This fails because "long" is a future reserved word in ECMAScript
 *
 
 * <code>FluxIT.util</code>,
 * <code>FluxIT.widget</code>,
 * <code>FluxIT.lang</code>,
 * <code>FluxIT.tool</code>,
 * <code>FluxIT.example</code>,
 * <code>FluxIT.env</code>) -- create your own namespace (e.g., 'companyname').
 *
 * @method namespace
 * @static
 * @param  {String*} arguments 1-n namespaces to create
 * @return {Object}  A reference to the last namespace object created
 */
FluxIT.namespace = function() {
	var a = arguments,
		o = null,
		i, j, d;
	for (i = 0; i < a.length; i = i + 1) {
		d = ("" + a[i]).split(".");
		o = FluxIT;

		// FluxIT is implied, so it is ignored if it is included
		for (j = (d[0] == "FluxIT") ? 1 : 0; j < d.length; j = j + 1) {
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}

	return o;
};





FluxIT.namespace("Server");

FluxIT.Server = (function(window, $, flx) {
	var url,
		$serviceList = $("#service-list");

	const SERVER_URL = "serverUrl";	

	toggleDetail = function(e) {
		var $target = $(e.target);

		$serviceList.find(".service").not($target).find(".service-detail").hide('fast');

		if (!$target.find(".service-detail").is(":visible")) {
			$target.find(".service-detail").show('fast');
		} else {
			$target.find(".service-detail").hide('fast');
		}
	},

	openNewTabUrl = function(e) {
		e.preventDefault();

		var url = $(e.target).attr("href");

		chrome.tabs.create({
			'url': url
		});
	},

	attachEvents = function() {
		$serviceList.find(".service").bind("click", toggleDetail);

		$serviceList.find(".external_link").bind("click", openNewTabUrl);
	},

	showLoading = function() {
		$serviceList.addClass("loading");
	},

	hideLoading = function(data, textStatus, jqXHR) {
		$serviceList.removeClass("loading");
	},

	throwError = function(jqXHR, textStatus, errorThrown) {
		var errorTmpl = Handlebars.getTemplate("error-template"),
			errors = [];

		errors.push("No se pudo acceder al servicio");

		$serviceList.empty();

		$serviceList.html(errorTmpl({
			errors: errors
		}));
	},

	showStatuses = function(data, textStatus, errorThrown) {
		var successTmpl = Handlebars.getTemplate("services-list-template");

		$serviceList.empty();
		$serviceList.html(successTmpl({
			services: data
		}));

		attachEvents();
	},

	getProperty = function(prop){
		if(localStorage.hasOwnProperty(prop)){
			return localStorage.getItem(prop);
		}
		return null;
	}

	getURL = function() {
		return getProperty(SERVER_URL);
	};

	// Public variables and functions
	var getStatus = function() {
		$.ajax(getURL(), {
			beforeSend: showLoading,
			timeout: 5000
		})
			.always(hideLoading)
			.done(showStatuses)
			.fail(throwError);
	};

	return {
		getServicesStatus: getStatus
	};
})(window, $, FluxIT);


// Run our FluxIT ServerStatus script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
   FluxIT.Server.getServicesStatus();
});