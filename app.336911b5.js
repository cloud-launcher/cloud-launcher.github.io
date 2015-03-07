!function e(n,t,r){function o(a,s){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var d=t[a]={exports:{}};n[a][0].call(d.exports,function(e){var t=n[a][1][e];return o(t?t:e)},d,d.exports,e,n,t,r)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,n){"use strict";e("angular"),e("angular-resource"),e("angular-local-storage"),n.exports={"cloud-launcher":angular.module("cloud-launcher",["ngResource","LocalStorageModule"]).service("newVersionCheck",e("./modules/cloud-launcher/newVersionCheck/service")).service("storedCredentials",e("./modules/cloud-launcher/storedCredentials/service")).directive("launcherUi",e("./modules/cloud-launcher/launcherUi/directive")).directive("description",e("./modules/cloud-launcher/launcherUi/description/directive")).directive("target",e("./modules/cloud-launcher/launcherUi/description/target/directive")).directive("configuration",e("./modules/cloud-launcher/launcherUi/description/configuration/directive")).directive("cost",e("./modules/cloud-launcher/launcherUi/description/cost/directive")).directive("dockerSearch",e("./modules/cloud-launcher/launcherUi/dockerSearch/directive")).directive("launch",e("./modules/cloud-launcher/launcherUi/launch/directive")).directive("providers",e("./modules/cloud-launcher/launcherUi/providers/directive")).directive("credentialCollector",e("./modules/cloud-launcher/launcherUi/providers/credentialCollector/directive"))}},{"./modules/cloud-launcher/launcherUi/description/configuration/directive":2,"./modules/cloud-launcher/launcherUi/description/cost/directive":4,"./modules/cloud-launcher/launcherUi/description/directive":6,"./modules/cloud-launcher/launcherUi/description/target/directive":7,"./modules/cloud-launcher/launcherUi/directive":10,"./modules/cloud-launcher/launcherUi/dockerSearch/directive":11,"./modules/cloud-launcher/launcherUi/launch/directive":13,"./modules/cloud-launcher/launcherUi/providers/credentialCollector/directive":15,"./modules/cloud-launcher/launcherUi/providers/directive":17,"./modules/cloud-launcher/newVersionCheck/service":20,"./modules/cloud-launcher/storedCredentials/service":21,angular:"angular","angular-local-storage":"angular-local-storage","angular-resource":"angular-resource"}],2:[function(e,n){"use strict";var t=function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e)){for(var t,r=[],o=e[Symbol.iterator]();!(t=o.next()).done&&(r.push(t.value),!n||r.length!==n););return r}throw new TypeError("Invalid attempt to destructure non-iterable instance")};n.exports=function(){return{restrict:"E",template:e("./template.html"),controller:["$scope",function(e){function n(){e.configurationText=JSON.stringify(e.configuration,null,"  ")}var r={domain:"cloud-launcher.io",root:"https://github.com/cloud-launcher",authorizations:["40:85:f0:9b:28:ad:5d:25:b5:51:2e:ad:f3:b3:31:98"],locations:{digitalocean:["sfo1"]},configuration:{www:1,api:2,influxdb:1},roles:{all:["cadvisor"]},containers:{api:{linkTo:["influxdb"]},influxdb:{container:"tutum/influxdb"}}};e.configuration=r,e.$on("containerModified",function(o,i,a){var s=i.split("/"),c=t(s,2),l=c[0],d=c[1];void 0===d&&(d=l),a?s.length>1?(r.configuration[d]=1,r.containers[d]={container:i}):r.configuration[i]=1:s.length>1?(delete r.configuration[d],delete r.containers[d]):delete r.configuration[i],n(),e.$broadcast("configurationModified",r)}),e.$on("locationModified",function(t,o,i,a){if(a){var s=r.locations[o]=r.locations[o]||[];-1===s.indexOf(i)&&s.push(i)}else{var s=r.locations[o];if(s){var c=s.indexOf(i);-1!==c&&(s.splice(c,1),0===s.length&&delete r.locations[o])}}n(),e.$broadcast("configurationModified",r)}),e.$broadcast("configurationModified",r),n()}]}}},{"./template.html":3}],3:[function(e,n){n.exports='<pre spellcheck="false" contenteditable>\n{{configurationText}}\n</pre>'},{}],4:[function(e,n){"use strict";n.exports=function(){return{restrict:"E",template:e("./template.html"),controller:["$scope",function(e){function n(n){t.providers={},t.total=0;for(var r in n.locations){var o=e.providers[r].profile,i=t.providers[r]={name:o.name,brand:o.brand,locations:{},total:0};for(var a in n.locations[r]){var s=n.locations[r][a],c=o.locations[s],l=i.locations[s]={name:s,vicinity:c.vicinity,machineTypes:{},total:0},d=l.machineTypes["512MB"]={size:"512MB",hourlyPrice:70,count:0,roles:{}};for(var u in n.configuration){{var p=n.configuration[u];d.roles[u]={name:u,count:p,cost:p*d.hourlyPrice}}d.count+=p,l.total+=p*d.hourlyPrice}i.total+=l.total}t.total+=i.total}}var t={providers:{},total:0};e.$on("configurationModified",function(e,t){n(t)}),e.cost=t,e.expanded={},n(e.configuration)}]}}},{"./template.html":5}],5:[function(e,n){n.exports='<div class="items">\n  <div ng-repeat="provider in cost.providers"\n       class="provider"\n       ng-click="expanded[provider.name] = !expanded[provider.name]">\n    <div class="provider-header"\n         title="Click to {{expanded[provider.name] ? \'collapse\' : \'expand\'}}">\n      <div class="provider-expand">{{expanded[provider.name] ? \'-\' : \'+\'}}</div>\n      <div>\n        <span class="provider-name">{{::provider.name}}</span>\n        <span ng-if="provider.brand" class="provider-brand">| {{::provider.brand}}</span>\n      </div>\n      <span class="provider-total">Total: ${{provider.total / 10000}} / hr</span>\n    </div>\n    <div class="locations">\n      <div ng-repeat="location in provider.locations"\n           ng-show="expanded[provider.name]"\n           class="location">\n        <span class="location-name">{{::location.vicinity}} ({{::location.name}})</span>\n        <div class="machine-types">\n          <div ng-repeat="type in location.machineTypes"\n               class="machine-type">\n            <span class="machine-count">({{type.count}}) {{::type.size}} @ ${{::(type.hourlyPrice / 10000)}} / hr</span>\n            <div class="roles">\n              <div ng-repeat="role in type.roles"\n                   class="role">\n                <span class="count">({{::role.count}})</span>\n                <span class="name">{{::role.name}}</span> @\n                <span class="cost">${{::(role.cost / 10000)}} / hr</span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="location-total">{{::location.vicinity}} ({{::location.name}}) Total: ${{location.total / 10000}} / hr</div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="total"\n     title="This is only an estimate! Actual cost may vary!">Estimated Running Cost*: ${{cost.total / 10000}} / hr</div>'},{}],6:[function(e,n){"use strict";n.exports=function(){return{restrict:"E",template:e("./template.html"),controller:["$scope",function(e){e.launch=function(){var n=e.providers.digitalocean,t=n.credentials.token,r=new n.$rawAPI(t);console.log("wrapper",r),r.dropletsGetAll(function(e,n,t){console.log(n,t);var r=t.getAllResponseHeaders();console.log(n,r)})}}]}}},{"./template.html":9}],7:[function(e,n){"use strict";n.exports=function(){return{restrict:"E",template:e("./template.html"),controller:["$scope",function(e){e.targets={CoreOS:{Stable:"557.2.0",Beta:"584.0.0",Alpha:"598.0.0"}},e.selectedTarget={CoreOS:"Alpha"}}]}}},{"./template.html":8}],8:[function(e,n){n.exports='<span class="target-header">Select An Operating System</span>\n<ul class="operating-systems">\n  <li class="os">\n    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" preserveAspectRatio="xMidYMin" height="30px" viewBox="24.5 40.5 744 224" enable-background="new 24.5 40.5 744 224" xml:space="preserve">\n      <g>\n      <g>\n      <path fill="#53A3DA" d="M136.168,45.527C76.898,45.527,28.689,93.739,28.689,153c0,59.265,48.209,107.474,107.479,107.474\n                    c59.252,0,107.465-48.209,107.465-107.474C243.633,93.739,195.42,45.527,136.168,45.527z"></path>\n      <path fill="#F1606D" d="M136.168,55.389c-17.283,0-31.941,27.645-37.235,66.069c-0.169,1.236-0.333,2.487-0.478,3.746\n                    c-0.723,6.047-1.213,12.335-1.458,18.808c-0.117,2.962-0.175,5.956-0.175,8.988c0,3.029,0.058,6.029,0.175,8.985\n                    c0.245,6.472,0.735,12.764,1.458,18.811c8.104,1.049,16.769,1.761,25.807,2.099c3.907,0.146,7.872,0.233,11.907,0.233\n                    c4.023,0,8-0.088,11.895-0.233c9.049-0.338,17.708-1.05,25.819-2.099c0.892-0.114,1.77-0.239,2.659-0.368\n                    c33.754-4.74,57.235-15.232,57.235-27.428C233.776,99.088,190.071,55.389,136.168,55.389z"></path>\n      <path fill="#FFFFFF" d="M176.541,125.569c-0.979-1.428-2.029-2.796-3.148-4.11c-8.956-10.557-22.297-17.265-37.224-17.265\n                    c-4.839,0-9.148,7.407-11.907,18.909c-1.096,4.586-1.947,9.819-2.495,15.498c-0.432,4.551-0.665,9.391-0.665,14.399\n                    s0.233,9.849,0.665,14.396c4.554,0.432,9.387,0.664,14.402,0.664c5.009,0,9.842-0.232,14.396-0.664\n                    c10.011-0.95,18.653-2.875,24.775-5.411c6.046-2.501,9.624-5.615,9.624-8.985C184.963,142.832,181.858,133.388,176.541,125.569z"></path>\n      </g>\n      <g>\n      <path fill="#231F20" d="M344.891,100.053c12.585,0,22.816,6.138,29.262,13.062l-10.064,11.326\n                    c-5.353-5.192-11.175-8.495-19.041-8.495c-16.839,0-28.953,14.16-28.953,37.291c0,23.448,11.169,37.608,28.32,37.608\n                    c9.128,0,15.895-3.775,21.717-10.228l10.067,11.169c-8.335,9.598-19.038,14.95-32.099,14.95c-26.119,0-46.731-18.88-46.731-53.025\n                    C297.37,120.036,318.454,100.053,344.891,100.053z"></path>\n      <path fill="#231F20" d="M416.961,125.701c19.352,0,36.822,14.793,36.822,40.597c0,25.647-17.471,40.439-36.822,40.439\n                    c-19.197,0-36.66-14.792-36.66-40.439C380.301,140.494,397.764,125.701,416.961,125.701z M416.961,191.945\n                    c11.33,0,18.25-10.228,18.25-25.647c0-15.577-6.92-25.804-18.25-25.804s-18.094,10.227-18.094,25.804\n                    C398.867,181.717,405.631,191.945,416.961,191.945z"></path>\n      <path fill="#231F20" d="M459.771,127.589h14.943l1.26,13.688h0.629c5.506-10.07,13.691-15.577,21.871-15.577\n                    c3.938,0,6.455,0.472,8.811,1.574l-3.148,15.734c-2.67-0.784-4.717-1.257-8.018-1.257c-6.139,0-13.539,4.245-18.256,15.893v47.203\n                    h-18.092L459.771,127.589L459.771,127.589z"></path>\n      <path fill="#231F20" d="M541.121,125.701c20.928,0,31.941,15.107,31.941,36.667c0,3.458-0.314,6.604-0.787,8.495h-49.09\n                    c1.57,14.003,10.379,21.869,22.811,21.869c6.613,0,12.273-2.041,17.941-5.662l6.135,11.326\n                    c-7.395,4.878-16.676,8.341-26.432,8.341c-21.404,0-38.08-14.95-38.08-40.439C505.561,141.12,523.023,125.701,541.121,125.701z\n                     M557.326,159.376c0-12.277-5.189-19.671-15.732-19.671c-9.125,0-16.996,6.768-18.57,19.671H557.326z"></path>\n      <path fill="#F1606D" d="M600.602,152.607c0-32.729,17.785-53.344,42.799-53.344c24.863,0,42.641,20.615,42.641,53.344\n                    c0,32.889-17.777,54.13-42.641,54.13C618.387,206.737,600.602,185.496,600.602,152.607z M678.49,152.607\n                    c0-28.639-14.158-46.731-35.09-46.731c-21.084,0-35.248,18.093-35.248,46.731c0,28.796,14.164,47.521,35.248,47.521\n                    C664.332,200.128,678.49,181.403,678.49,152.607z"></path>\n      <path fill="#53A4D9" d="M699.738,186.125c7.557,8.495,18.412,14.003,30.529,14.003c15.732,0,25.807-8.499,25.807-20.767\n                    c0-12.904-8.494-17.154-18.723-21.717l-15.736-7.082c-8.969-3.936-20.934-10.385-20.934-25.808\n                    c0-14.947,12.904-25.492,30.059-25.492c12.588,0,22.658,5.665,28.949,12.435l-4.244,4.878c-5.982-6.452-14.32-10.7-24.705-10.7\n                    c-13.691,0-22.816,7.239-22.816,18.565c0,11.962,10.385,16.521,17.936,19.985l15.738,6.921\n                    c11.486,5.195,21.713,11.647,21.713,27.539s-13.061,27.851-33.201,27.851c-15.107,0-26.75-6.451-34.932-15.576L699.738,186.125z"></path>\n      </g>\n      </g>\n      </svg>\n  </li>\n  <li ng-repeat="(name, version) in targets[\'CoreOS\']"\n      ng-class="{\'version\': true, \'selected\': name === selectedTarget[\'CoreOS\']}"\n      ng-click="selectedTarget[\'CoreOS\'] = name">\n      <div>{{::name}}</div>\n      <div class="number">{{::version}}</div>\n  </li>\n</ul>'},{}],9:[function(e,n){n.exports='<configuration></configuration>\n<div class="side">\n  <cost></cost>\n  <target></target>\n  <button class="launch" ng-click="launch()">LAUNCH</button>\n</div>'},{}],10:[function(e,n){"use strict";var t=e("launch-cloud-browser"),r=e("lodash");n.exports=["newVersionCheck","storedCredentials",function(n,o){return{restrict:"E",template:e("./template.html"),controller:["$scope",function(e){var n={},i=t(n),a=i.providers;e.providers=a,r.each(a,function(e){r.extend(e,o.getCredentials(e.name)||{})}),e.availableSizes=r.flatten(r.map(r.values(a),function(e){return r.keys(e.profile.sizes)})),e.$on("configurationModified",function(n,t){var r=t.locations;if(r)for(var o in r){var i=r[o];for(var a in i){var s=i[a];e.providers[o].profile.locations[s].selected=!0}}})}]}}]},{"./template.html":19,"launch-cloud-browser":"launch-cloud-browser",lodash:"lodash"}],11:[function(e,n){"use strict";var t=e("lodash");n.exports=["$resource",function(n){var o=n("https://registry.hub.docker.com/v1/search?q=:query&n=:count&page=:page");return{restrict:"E",template:e("./template.html"),link:function(e,n){function i(e){var n=e.query,t=e.page;e.querying=!0,t+=1;var r=o.get({query:n,count:100,page:t},function(){if(r.query!=e.query)return void console.log("didn't match",n,r.query);var o=(r.num_pages,r.num_results),a=(r.page_size,r.results);e.page=t,e.results.push.apply(e.results,a),e.results.sort(e.sortFn),e.end=e.results.length,e.total=o,e.resultsLoaded=e.results.length/o*100,o>e.results.length?i(e):e.querying=!1})}var a=(n.find("input"),{query:"",results:[],showLimit:20,limitStep:20,sortBy:"stars",sortFn:r.stars});e.docker=a,e.selectedContainers={},e.queryChanged=function(){var e=a.query;a.querying=!1,a.haveFirstResults=!1,a.showLimit=20,a.limitStep=20,a.page=0,a.start=0,a.end=0,a.total=0,a.resultsLoaded=0,a.results.splice(0,a.results.length),""!==e?s(e):(a.querying=!1,a.showResults=!1)},e.sortBy=function(){switch(a.sortBy){case"stars":a.sortFn=r.stars;break;case"name":a.sortFn=r.name}a.results.sort(a.sortFn)},e.selectContainer=function(n){e.$broadcast("containerModified",n,e.selectedContainers[n])};var s=t.debounce(function(e){a.querying=!0;var n=o.get({query:e,count:1e3,page:1},function(){if(n.query!=a.query)return void console.log("didn't match",e,n.query);var t=(n.num_pages,n.num_results),r=n.page,o=n.page_size,s=n.results;a.haveFirstResults=!0,a.querying=!1,a.results.push.apply(a.results,s),a.results.sort(a.sortFn),a.page=1,a.start=r*o-o+1,a.end=Math.min(a.start+o-1,t),a.end=a.results.length,a.total=t,a.showResults=""!==e,a.resultsLoaded=a.results.length/t*100,t>a.results.length&&i(a)})},500)},controller:["$scope",function(){}]}}];var r={stars:function(e,n){return e.star_count<n.star_count?1:e.star_count===n.star_count?e.name<n.name?-1:1:-1},name:function(e,n){return e.name<n.name?-1:1}}},{"./template.html":12,lodash:"lodash"}],12:[function(e,n){n.exports='<div class="search">\n  <input type="text" placeholder="Search Docker Hub For Containers..." ng-model="docker.query" ng-change="queryChanged($event)" autofocus>\n  <span class="querying">\n    <span class="indicator" ng-show="docker.querying">\n    </span>\n    <span class="close" ng-show="docker.query != \'\'" ng-click="docker.query = \'\'; queryChanged()" title="Close Search">X</span>\n  </span>\n</div>\n<div ng-show="docker.haveFirstResults"\n     class="display">\n  <header>\n    <div class="sort-by">\n      <span class="text">Sort By:</span>\n      <select ng-model="docker.sortBy" ng-change="sortBy()">\n        <option value="stars">Stars</option>\n        <option value="name">Name</option>\n      </select>\n    </div>\n    <div class="title">Docker Hub Results</div>\n    <div class="result-summary">\n      <div class="progress-bar" style="width: {{docker.resultsLoaded}}%;"></div>\n      <div class="summary"\n           ng-show="docker.haveFirstResults">{{docker.end}} of {{docker.total}} Matches Retrieved</div>\n    </div>\n  </header>\n  <div ng-show="docker.haveFirstResults"\n       class="results">\n    <div class="visible-results">\n      <div ng-repeat="result in docker.results | limitTo: docker.showLimit"\n           ng-class="{\'result\': true, \'selected\': selectedContainers[result.name]}"\n           ng-click="selectedContainers[result.name] = !selectedContainers[result.name]">\n        <div class="stars">\n          <span class="star">\n            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="17px" height="16px" viewBox="6 6.4 17 16" style="enable-background:new 6 6.4 17 16;" xml:space="preserve">\n              <polygon style="fill:#ff8;stroke:#939BA7;stroke-width:0.5723;stroke-miterlimit:10;" points="14.5,19.1 9.8,21.6 10.7,16.4   6.9,12.6 12.2,11.9 14.5,7.1 16.8,11.9 22.1,12.6 18.3,16.4 19.2,21.6 "/>\n            </svg>\n          </span>\n          <span class="star-count">{{::result.star_count}}</span>\n        </div>\n        <div class="container-details">\n          <span class="container-name">{{::result.name}}</span>\n          <span class="container-description">{{::result.description}}</span>\n        </div>\n        <div class="size"\n             ng-if="selectedContainers[result.name]"\n             ng-click="$event.stopPropagation()">\n          <select class="size-select">\n            <option ng-repeat="size in availableSizes">{{size}}</option>\n          </select>\n        </div>\n        <div class="container-select">\n          <input type="checkbox"\n                 ng-model="selectedContainers[result.name]"\n                 ng-change="selectContainer(result.name)">\n        </div>\n      </div>\n    </div>\n    <div class="show-more"\n         ng-show="docker.results.length > docker.showLimit"\n         ng-click="docker.showLimit = docker.showLimit + docker.limitStep">\n         Show next {{docker.limitStep}} matches...\n    </div>\n  </div>\n</div>'},{}],13:[function(e,n){"use strict";n.exports=function(){return{restrict:"E",template:e("./template.html"),controller:["$scope",function(){}]}}},{"./template.html":14}],14:[function(e,n){n.exports=""},{}],15:[function(e,n){"use strict";var t=e("lodash");n.exports=[function(){return{restrict:"E",template:e("./template.html"),scope:{provider:"="},link:function(){console.log("link")},controller:["$scope","storedCredentials",function(e,n){e.credentialsChanged=function(){console.log(e),t.each(e.provider.credentials,function(t){t.length>0&&(e.provider.hasCredential=!0),e.provider.saveCredentials&&n.setCredentials(e.provider.name,e.provider.saveCredentials,e.provider.credentials)})},e.handleSave=function(){e.provider.saveCredentials?n.setCredentials(e.provider.name,!0,e.provider.credentials):n.setCredentials(e.provider.name,!1)}}]}}]},{"./template.html":16,lodash:"lodash"}],16:[function(e,n){n.exports='<label ng-repeat="(name, part) in provider.credentialSchema"\n       class="part">\n  <div class="name">{{::part.header}}</div>\n\n  <input type="text" ng-model="provider.credentials[name]" ng-change="credentialsChanged($event)">\n</label>\n\n<label class="save"\n       title="Your credentials are {{save ? \'SAVED\' : \'NOT SAVED\'}} in your browser\'s local storage. Your credentials are NEVER transmitted to cloud-launcher or any party other than this provider.">\n  <span class="save-header">Save In Local Storage</span>\n  <input type="checkbox" ng-model="provider.saveCredentials" ng-change="handleSave($event)">\n</label>'},{}],17:[function(e,n){"use strict";n.exports=function(){return{restrict:"E",template:e("./template.html"),controller:["$scope",function(e){e.showCredentialCollector={},e.selectLocation=function(n,t,r){e.$broadcast("locationModified",n,t,r.selected)}}]}}},{"./template.html":18}],18:[function(e,n){n.exports='<div ng-repeat="(name, provider) in providers" class="provider {{::name}}">\n  <div class="header">\n    <span class="help">?</span>\n    <span class="name">{{::provider.profile.name}} <span ng-if="provider.profile.brand" class="brand">| {{::provider.profile.brand}}</span></span>\n    <span ng-class="{\'key\': true, \'has-credential\': provider.hasCredential}"\n          ng-if="!provider.profile.comingsoon"\n          ng-click="showCredentialCollector[name] = !showCredentialCollector[name]"\n          title="{{provider.profile.name + \' Credentials \' + (provider.hasCredential ? \'Needed\' : \'Acquired\')}}">⚿</span>\n  </div>\n  <credential-collector ng-if="showCredentialCollector[name]" provider="provider">\n    Credentials needed yo!\n  </credential-collector>\n  <!-- <div class="selections"> -->\n    <div class="locations">\n      <label ng-repeat="(name, location) in provider.profile.locations"\n             ng-class="{\'location\': true, \'selected\': location.selected}">\n        <input type="checkbox"\n               ng-model="location.selected"\n               ng-change="selectLocation($parent.name, name, location)"\n               tabindex="{{provider.profile.comingsoon ? -1 : \'\'}}">\n        <span class="text">\n          <span class="location-vicinity">{{::location.vicinity}}</span> <span class="location-name">({{::name}})</span>\n        </span>\n      </label>\n      <div ng-if="provider.profile.comingsoon" class="comingsoon"><div class="banner">Coming Soon!</div></div>\n    </div>\n  <!-- </div> -->\n</div>'},{}],19:[function(e,n){n.exports="<description></description>\n\n<docker-search></docker-search>\n\n<providers></providers>"},{}],20:[function(e,n){"use strict";var t=60*(10+5*Math.random())*1e3;n.exports=["$interval","$http","$rootScope",function(e,n,r){var o=!1;r.ignoreNewVersion=function(){o=!0,r.newVersionAvailable=!1,e.cancel(i)};var i=e(function(){n.get("currentVersion?"+(new Date).getTime()).success(function(e){r.newVersionAvailable=!o&&clVersion!=e}).error(function(){})},t)}]},{}],21:[function(e,n){"use strict";n.exports=["localStorageService",function(e){function n(n){return e.get(r(n))}function t(n,t,o){var i=r(n);e.set(i,{saveCredentials:t,credentials:o})}function r(e){return"credentials."+e}return{getCredentials:n,setCredentials:t}}]},{}]},{},[1]);