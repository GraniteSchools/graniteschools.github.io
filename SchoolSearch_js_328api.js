var map, locator;
//var dojoConfig = { parseOnLoad:true };
require([
  "esri/map",

          "esri/geometry/Extent",
          "esri/layers/ImageParameters",
          "esri/InfoTemplate",
          "esri/dijit/InfoWindow",

          "esri/dijit/HomeButton",
          "esri/dijit/LocateButton",
          "esri/dijit/Measurement",

          "esri/layers/VectorTileLayer",
          'esri/layers/WebTiledLayer',
          "esri/layers/ArcGISDynamicMapServiceLayer",
          "esri/layers/FeatureLayer",

          "esri/tasks/locator",
          "esri/tasks/QueryTask",
          "esri/tasks/query",
          "esri/graphic",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/Font",
          "esri/Color",
          "esri/symbols/TextSymbol",


          "dojo/_base/array",
          "dojo/_base/Color",
          "dojo/number",
          "dojo/parser",
          "dojo/on",
          "dojo/dom",
          "dijit/registry",
          "dijit/form/Form",
          "dijit/form/Button",
          "dijit/form/ToggleButton",
          "dijit/form/TextBox",
          "dijit/layout/BorderContainer",
          "dijit/layout/ContentPane",
          "dijit/TitlePane",
          "dojo/domReady!"],
          function(map,Extent,ImageParameters,InfoTemplate,InfoWindow,HomeButton,LocateButton,Measurement,VectorTileLayer,WebTiledLayer,AGDMSL,FeatureLayer, i, QueryTask, Query, u, graphic, Font,Color,TextSymbol, c, h, p, parser,on, dojo, dom)

    {
    parser.parse();
    function T() {
      ElPoly.setVisibility(true);
      BS_El.setVisibility(true);
      JrPoly.setVisibility(false);
      BS_Jr.setVisibility(false);
      SrPoly.setVisibility(false);
      BS_Sr.setVisibility(false)

        k()
    }

    function N() {
      ElPoly.setVisibility(false);
      BS_El.setVisibility(false);
      JrPoly.setVisibility(true);
      BS_Jr.setVisibility(true);
      SrPoly.setVisibility(false);
      BS_Sr.setVisibility(false)


        k()
    }

    function C() {
      ElPoly.setVisibility(false);
      BS_El.setVisibility(false);
      JrPoly.setVisibility(false);
      BS_Jr.setVisibility(false);
      SrPoly.setVisibility(true);
      BS_Sr.setVisibility(true)


        k()
    }

    function k() {
        if (dojo.byId("busButton").checked) {
            if (ElPoly.visible === true) {
                busElem.setVisibility(true);
                busJr.setVisibility(false);
                busSr.setVisibility(false)
            } else if (JrPoly.visible === true) {
                busElem.setVisibility(false);
                busJr.setVisibility(true);
                busSr.setVisibility(false)
            } else if (SrPoly.visible === true) {
                busElem.setVisibility(false);
                busJr.setVisibility(false);
                busSr.setVisibility(true)
            }
        } else {
            busElem.setVisibility(false);
            busJr.setVisibility(false);
            busSr.setVisibility(false)
        }
    }

    function L() {
        if (dojo.byId("busButton").checked) {
            busElem.setVisibility(false);
            busJr.setVisibility(false);
            busSr.setVisibility(false)
        } else {
            if (ElPoly.visible === true) {
                busElem.setVisibility(true);
                busJr.setVisibility(false);
                busSr.setVisibility(false)
            } else if (JrPoly.visible === true) {
                busElem.setVisibility(false);
                busJr.setVisibility(true);
                busSr.setVisibility(false)
            } else if (SrPoly.visible === true) {
                busElem.setVisibility(false);
                busJr.setVisibility(false);
                busSr.setVisibility(true)
            }
        }
    }

    function A() {
        map.graphics.clear();
        dojo.byId("prResults").innerHTML = "";
        dojo.byId("elResults").innerHTML = "<br/><center><img src='images/circleThick.gif'></center><br/>";
        dojo.byId("jrResults").innerHTML = "";
        dojo.byId("srResults").innerHTML = "";
        dojo.byId("elBusResults").innerHTML = "";
        dojo.byId("jrBusResults").innerHTML = "";
        dojo.byId("srBusResults").innerHTML = "";
        if (dojo.byId("address").value) {
            var e = {
                Street: dojo.byId("address").value,
                //Zone: dojo.byId("zone").value
                Zip: dojo.byId("zone").value
            };
            var t = {
                //address: e,searchExtent: map.extent

                address: e,searchExtent:new Extent({
          xmin:-12496763,
          xmax:-12423390,
          ymax: 5001245,
          ymin: 4930000,
          spatialReference: {
              wkid: 3857
          }
      })
            };
            locator.outSpatialReference = map.spatialReference;

            locator.addressToLocations(t);
        } else {
            dojo.byId("elResults").innerHTML = "<strong>Results</strong><br/><br/>";
            dojo.byId("elResults").innerHTML += "<font color='red'>&nbsp;&nbsp;&nbsp;Please enter your address</font><br/>"
        }
    }

    function O(e) {
        var t;
        var n = new graphic;
        n.setStyle(graphic.STYLE_CIRCLE);
        n.setColor(new h("red"));
        var r;
        c.every(e.addresses, function(e) {
            console.log("Address match score: " + e.score + "%");
            if (e.score > 50) {
                r = e.location;
                var t = new u(r, n);
                map.graphics.add(t);
                //var i = e.address;
                var result = e.address
                //console.log(result);
                var i = result.split(',',1).toString();
                //console.log(i);
                //Found Address label
                var labelFont = new Font("14pt", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Arial");
                var labelText = new TextSymbol(i, labelFont, new h("#182A5F"));
                labelText.setHaloColor(new Color([255, 255, 255]));
                labelText.setHaloSize(2);
                labelText.setOffset(0, 15);
                map.graphics.add(new u(r, labelText));
                M(r);
                return false
            }
        });
        if (r !== undefined) {
            map.centerAndZoom(r,16)
        } else {
            dojo.byId("elResults").innerHTML = "<strong>Results</strong><br/><br/>";
            dojo.byId("elResults").innerHTML += "<font color='red'>&nbsp;&nbsp;&nbsp;Sorry, your address was not found in &nbsp;&nbsp the Granite School District Area</font><br/>"
        }
    }

    function M(e) {
        query = new Query();
        query.geometry = e;
        elQueryTask.execute(query, function(t) {
            if (t.features[0]) {
                D(e);
                P(e);
                H(e)
            } else {
                _(e)
            }
        })
    }

    function _(e) {
        query = new Query();
        query.outFields = ["NAME", "TELE", "URL"];
        query.geometry = e;
        sdQueryTask.execute(query, function(e) {
            dojo.byId("elResults").innerHTML = "<strong>Results</strong><br/><br/>";
            dojo.byId("elResults").innerHTML += "<font color='red'>You are outside Granite boundaries</font><br/>";
            dojo.byId("elResults").innerHTML += "<font color='red'>You are in the:</font><br/><br/>";
            dojo.byId("elResults").innerHTML += "<strong><font size='2'>" + e.features[0].attributes.NAME + "</strong><br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += "<font size='3'>" + e.features[0].attributes.TELE + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += "<font size='3'><a href='" + e.features[0].attributes.URL + "'>District Home Page</a><br/>"
        })
    }

    function D(e) {
        query = new Query();
        query.outFields = ["Precinct", "ROMAN", "BRD_MEM"];
        query.geometry = e;
        prQueryTask.execute(query, function(e) {
            dojo.byId("prResults").innerHTML = "<strong>Results</strong><br/>";
            dojo.byId("prResults").innerHTML += "<font size ='2'><center>Precinct " + e.features[0].attributes.ROMAN + "<br/>";
            dojo.byId("prResults").innerHTML += "<center><strong>" + e.features[0].attributes.BRD_MEM + "</strong><br/>";
            dojo.byId("prResults").innerHTML += "<font size ='2'><center><a href='http://www.graniteschools.org/board/'>Board of Education Home Page</a><br/><br/>"
        })
    }

    function P(e) {
        query = new Query();
        query.outFields = ["DIST_NAME", "ADDRESS", "CITY", "TELE", "HTTP", "PRINT_"];
        query.geometry = e;
        elQueryTask.execute(query, function(e) {
            dojo.byId("elResults").innerHTML = "<font color='gray'>Elementary School</font><br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += "<strong>" + e.features[0].attributes.DIST_NAME + "</strong><br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += e.features[0].attributes.ADDRESS + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += e.features[0].attributes.CITY + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += e.features[0].attributes.TELE + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += "<font size ='2'><a href='" + e.features[0].attributes.HTTP + "'>Home Page</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            dojo.byId("elResults").innerHTML += "<font size ='2'><a href='" + e.features[0].attributes.PRINT_ + "'>Print Map</a><br/>"
        });
        jrQueryTask.execute(query, function(e) {
            dojo.byId("jrResults").innerHTML = "<font color='gray'>Junior High School</font><br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("jrResults").innerHTML += "<strong>" + e.features[0].attributes.DIST_NAME + "</strong><br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("jrResults").innerHTML += e.features[0].attributes.ADDRESS + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("jrResults").innerHTML += e.features[0].attributes.CITY + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("jrResults").innerHTML += e.features[0].attributes.TELE + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("jrResults").innerHTML += "<font size ='2'><a href='" + e.features[0].attributes.HTTP + "'>Home Page</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            dojo.byId("jrResults").innerHTML += "<font size ='2'><a href='" + e.features[0].attributes.PRINT_ + "'>Print Map</a><br/>"
        });
        srQueryTask.execute(query, function(e) {
            dojo.byId("srResults").innerHTML = "<font color='gray'>Senior High School</font><br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("srResults").innerHTML += "<strong>" + e.features[0].attributes.DIST_NAME + "</strong><br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("srResults").innerHTML += e.features[0].attributes.ADDRESS + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("srResults").innerHTML += e.features[0].attributes.CITY + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("srResults").innerHTML += e.features[0].attributes.TELE + "<br/>&nbsp;&nbsp;&nbsp;";
            dojo.byId("srResults").innerHTML += "<font size ='2'><a href='" + e.features[0].attributes.HTTP + "'>Home Page</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            dojo.byId("srResults").innerHTML += "<font size ='2'><a href='" + e.features[0].attributes.PRINT_ + "'>Print Map</a><br/>"
        })
    }

    function H(e) {
        query = new Query();
        query.geometry = e;
        ebQueryTask.execute(query, function(e) {
            if (e.features[0]) {
                dojo.byId("elBusResults").innerHTML = "<strong>Busing: </strong><font color=#00CC33>Eligible"
            } else {
                dojo.byId("elBusResults").innerHTML = "<strong>Busing: </strong><font color=red>Ineligible</br>"
            }
        });
        jbQueryTask.execute(query, function(e) {
            if (e.features[0]) {
                dojo.byId("jrBusResults").innerHTML = "<strong>Busing: </strong><font color=#00CC33>Eligible"
            } else {
                dojo.byId("jrBusResults").innerHTML = "<strong>Busing: </strong><font color=red>Ineligible</br>"
            }
        });
        sbQueryTask.execute(query, function(e) {
            if (e.features[0]) {
                dojo.byId("srBusResults").innerHTML = "<strong>Busing: </strong><font color=#00CC33>Eligible";
                dojo.byId("srBusResults").innerHTML += "</br></br>For additional questions regarding busing, please call (385) 646-4280."
            } else {
                dojo.byId("srBusResults").innerHTML = "<strong>Busing: </strong><font color=red>Ineligible";
                dojo.byId("srBusResults").innerHTML += "</br></br>For additional questions regarding busing, please call (385) 646-4280."
            }
        })
    }


    map = new esri.Map("map", {


     extent: new Extent({
          xmin:-12496763,
          xmax:-12423390,
          ymax: 5001245,
          ymin: 4930000,
          spatialReference: {
              wkid: 3857
          }
      }),
  zoom:13,
  minZoom: 9,
  maxZoom: 20



});

var imageParameters = new ImageParameters();
imageParameters.format = "png32"

var busTemplate = new InfoTemplate();
busTemplate.setTitle("<b>#${BUS_NUM}</b>");
busTemplate.setContent("<b>School:</b>  ${SCHOOL_NAM}<br>" +
                    "<b>Bus Number:</b>  ${BUS_NUM}<br>" +
                    "<b>Address:</b>  ${ADDRESS}<br>" +
                    "<b>Pickup Time:</b>  ${PICKUP}<br>" +
                    "<b>Route ID:</b>  ${ROUTE_ID}<br>" +
                    "<b>Stop #:</b>  ${STOP_NUM}");

    var template = new InfoTemplate();
    template.setTitle("<b>${NAME}</b>");
    //template.setContent("<b>${ADDRESS}</b><br>"+"<b>${CITY}</b><br>"+"<a target='_blank' href=${HTTP}>School Website</a>")
    template.setContent("<b>${ADDRESS}</b>")

    var addTemplate = new InfoTemplate();
    addTemplate.setTitle("<b>${NAME}</b>");
    addTemplate.setContent("<b>${ZIP5}</b>")



//dojo.connect(map, 'onLoad', function(map){initToolbar(map);});
//  }, dom.byId("measurementDiv"));
var locateButton = new LocateButton({
    map: map
}, "LocateButton");
locateButton.startup();

    var measurement = new Measurement({
      map: map
      }, "measurementDiv");
      measurement.startup();

    var homeButton = new HomeButton({
        map: map
    }, "HomeButton");
    homeButton.startup();













    //var y = Elementary Old varibles
    //var b  = Jr. High
    //var w = Sr. High

    //Elementary Package
    var ElPoly =    new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/ElemBounds/MapServer",{"imageParameters" : imageParameters});
        ElPoly.setInfoTemplates({0: {infoTemplate:template}});

    var JrPoly =    new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/JrBounds/MapServer",{"imageParameters" : imageParameters,"visible": false});
        JrPoly.setInfoTemplates({0: {infoTemplate:template}});

    var SrPoly =    new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/SrBounds/MapServer",{"imageParameters" : imageParameters,"visible": false});
        SrPoly.setInfoTemplates({0: {infoTemplate:template}});

    //Bus Services
    var busElem = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/BusEligElem/MapServer", {
        visible: false,
        opacity: .5
    });
    var busJr = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/BusEligJr/MapServer", {
        visible: false,
        opacity: .5
    });
    var busSr = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/BusEligSr/MapServer", {
        visible: false,
        opacity: .5
    });

    //Bus Stops
//var BS_El = new AGDMSL("https://arcgis1.graniteschools.org/server/rest/services/BusStopsElem/MapServer", {visible:false});
var BS_El = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/BusStopsElem/MapServer");
var BS_Jr = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/BusStopsJr/MapServer", {visible:false});
var BS_Sr = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/BusStopsSr/MapServer", {visible:false});
BS_El.setInfoTemplates({0: {infoTemplate: busTemplate}});
BS_Jr.setInfoTemplates({0: {infoTemplate: busTemplate}});
BS_Sr.setInfoTemplates({0: {infoTemplate: busTemplate}});

    //Zip GeocodeServer
    var zip5 = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/ZipCodes/MapServer", {
        visible: true
    });
    zip5.setInfoTemplates({0: {infoTemplate:addTemplate}});

    //Address points
    var addPts = new FeatureLayer('https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahAddressPoints/FeatureServer/0',{minScale:4000});


    //Add AGRC basemaps pacakge
		terLyr = new  WebTiledLayer('https://discover.agrc.utah.gov/login/path/fuel-cola-scoop-canyon/tiles/terrain_basemap/${level}/${col}/${row}',{maxScale: 8001});
    //terLyr = new  VectorTileLayer('https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer',{maxScale: 8001});
		imgLyr = new  WebTiledLayer('https://discover.agrc.utah.gov/login/path/fuel-cola-scoop-canyon/tiles/utah/${level}/${col}/${row}',{minScale: 8000});
		overLyr = new WebTiledLayer('https://discover.agrc.utah.gov/login/path/fuel-cola-scoop-canyon/tiles/overlay_basemap/${level}/${col}/${row}',{minScale: 8000});
		map.addLayers([terLyr,imgLyr,overLyr]);

    map.addLayers([ElPoly,JrPoly,SrPoly,BS_El,BS_Jr,BS_Sr,busElem,busJr,busSr,zip5,addPts]);

    map.infoWindow.resize(250,75);
    addPts.hide();


    locator = new i("http://www2.graniteschools.org/enterprise/rest/services/AGRC_CompositeLocator/GeocodeServer");
    locator.on("address-to-locations-complete", O);
   dom.byId("locate").on("click", A);
   dom.byId("elButton").on("click", T);
   dom.byId("jrButton").on("click", N);
   dom.byId("srButton").on("click", C);
   dom.byId("busButton").on("click", L);
   dom.byId("addressForm").on("keyup", function(e){
        if (e.keyCode == 13) {
            A();
        }
    });

    //Query Tasks
    //Zip
    //zipQueryTask = new QueryTask("https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahZipCodeAreas/FeatureServer");
    //Precinct District
    prQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/PrecinctAndDistrcit/MapServer/0");
    sdQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/PrecinctAndDistrcit/MapServer/1");

    //Boundary
    elQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/SchoolBoundaries__19_20/FeatureServer/0");
    jrQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/SchoolBoundaries__19_20/FeatureServer/1");
    srQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/SchoolBoundaries__19_20/FeatureServer/2");

    //Bussing Elegibility
    ebQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/All_BusElig/FeatureServer/0");
    jbQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/All_BusElig/FeatureServer/1");
    sbQueryTask = new QueryTask("http://www2.graniteschools.org/enterprise/rest/services/All_BusElig/FeatureServer/2")



    //Clears all graphics and selections
    function clearAll(){
      map.graphics.clear();
      map.infoWindow.hide();
    }


   dom.byId("clear").on("click", clearAll);





})
