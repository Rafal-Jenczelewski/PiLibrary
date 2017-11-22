import rest from "rest";

import rest0 from "rest/mime/type/application/hal";
import api from "./api/uriListConverter";
import baseRegistry from "rest/mime/registry";
import errorCode from "rest/interceptor/errorCode";
import uriTemplateInterceptor from "./api/uriTemplateInterceptor";
import mime from "rest/interceptor/mime";
import defaultRequest from "rest/interceptor/defaultRequest";

var registry = baseRegistry.child();

registry.register('text/uri-list', api);
registry.register('application/hal+json', rest0);

module.exports = rest
    .wrap(mime, {registry: registry})
    .wrap(uriTemplateInterceptor)
    .wrap(errorCode)
    .wrap(defaultRequest, {headers: {'Accept': 'application/hal+json'}});
