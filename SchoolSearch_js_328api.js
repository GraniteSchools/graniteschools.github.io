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
        elemPoly.setVisibility(true);
        //elemOutline.setVisibility(true);
        //elempnt.setVisibility(true);

        JrPoly.setVisibility(false);
        JrOutline.setVisibility(false);
        SrPoly.setVisibility(false);
        SrOutline.setVisibility(false);


        k()
    }

    function N() {
        elemPoly.setVisibility(false);
        //elemOutline.setVisibility(false);
        //elempnt.setVisibility(false);
        JrOutline.setVisibility(true);
        JrPoly.setVisibility(true);
        SrPoly.setVisibility(false);
        SrOutline.setVisibility(false);
        k()
    }

    function C() {
        elemPoly.setVisibility(false);
        //elemOutline.setVisibility(false);
        //elempnt.setVisibility(false);
        JrPoly.setVisibility(false);
        JrOutline.setVisibility(false);
        SrPoly.setVisibility(true);
        SrOutline.setVisibility(true);
        k()
    }

    function k() {
        if (dojo.byId("busButton").checked) {
            if (elemPoly.visible === true) {
                busElem.setVisibility(true);
                busJr.setVisibility(false);
                busSr.setVisibility(false)
            } else if (JrOutline.visible === true) {
                busElem.setVisibility(false);
                busJr.setVisibility(true);
                busSr.setVisibility(false)
            } else if (SrOutline.visible === true) {
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
            if (elemPoly.visible === true) {
                busElem.setVisibility(true);
                busJr.setVisibility(false);
                busSr.setVisibility(false)
            } else if (JrOutline.visible === true) {
                busElem.setVisibility(false);
                busJr.setVisibility(true);
                busSr.setVisibility(false)
            } else if (SrOutline.visible === true) {
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
    //parser.parse();





// var SiteTemplate = new InfoTemplate();
// SiteTemplate.setTitle("<b>${School_Name}</b>");
// SiteTemplate.setContent("<b>Feature:</b>  ${FeatureType}<br>" +
//                     "<b>Squre Feet:</b>  ${SqFt} sq ft <br>");



    //
    // map = new esri.Map("map", {
    //     logo: false
    // });


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

    var template = new InfoTemplate();
    template.setTitle("<b>${DIST_NAME}</b>");
    template.setContent("<b>${ADDRESS}</b><br>"+"<b>${CITY}</b><br>"+"<a target='_blank' href=${HTTP}>School Website</a>")

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
    var elemPoly =    new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/ElemService_Trans/MapServer",{"imageParameters" : imageParameters});
    elemPoly.setInfoTemplates({2: {infoTemplate:template}});
    //var elempnt = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/Elementary_Schools/MapServer");
    //var elemOutline = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/Elem_Outlines_19_20/MapServer");
    //var elemPoly =    new FeatureLayer("http://www2.graniteschools.org/enterprise/rest/services/SchoolBoundaries__19_20/FeatureServer/0", {maxScale: 10001,"opacity":.4, infoTemplate:template, outFields:["*"]});
    //var elemPoly =    new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/SchoolBoundaries__19_20/MapServer/0", {setMaxScale: 10001,"opacity":.4, infoTemplate:template, outFields:["*"]});

    //var elemPoly =    new FeatureLayer("http://www2.graniteschools.org/enterprise/rest/services/SchoolBoundaries__19_20/MapServer/0", {"opacity":.5});

   //var elemOutline = new AGDMSL("http://www2.graniteschools.org/server/rest/services/elemOutline/MapServer");

    //var elemSite = new AGDMSL("http://www2.graniteschools.org/arcgis/rest/services/ElemSitePlans/MapServer", {"opacity":.5});

    //Junior High Package
   // var JrPoly =    new FeatureLayer("https://services7.arcgis.com/jv9LxT1Je6SeWSAz/ArcGIS/rest/services/Current_Boundaries/FeatureServer/1?token=kY0W4e8Oo7BTijyYMfkcP81gMf5XKAyOavYmVbR2gIFobbH2A85joJid3qUEL0hm6Zxmf4vNTrjlM3TT_t-hUWiNVUUnyWX83Pj9pkuaSW8ERHPpyvxuNLYHXne-AyxqcW_odN5OJ9_wXsNxPf0QdSxN8NJKDwFeZLrXxdY4AwLci_L800DYqKW_CbwEw9V10GbeFBMs4zrNrKMpUQ5MoSFt3AROYKaoqdWi3u6WJzbz3u-NK5FJAeGOtZj1tx1k", {
  //    "opacity":.4,
  //    "visible": false,
   //   });
    var JrPoly =    new FeatureLayer("http://www2.graniteschools.org/enterprise/rest/services/SchoolBoundaries__19_20/MapServer/1", {"opacity":.5,"visible": false,});
    var JrOutline =    new AGDMSL("http://www2.graniteschools.org/arcgis/rest/services/JrBoundaries_2/MapServer", {"visible": false});

    //Senior High Package
  //  var SrPoly =    new FeatureLayer("https://services7.arcgis.com/jv9LxT1Je6SeWSAz/ArcGIS/rest/services/Current_Boundaries/FeatureServer/2?token=kY0W4e8Oo7BTijyYMfkcP81gMf5XKAyOavYmVbR2gIFobbH2A85joJid3qUEL0hm6Zxmf4vNTrjlM3TT_t-hUWiNVUUnyWX83Pj9pkuaSW8ERHPpyvxuNLYHXne-AyxqcW_odN5OJ9_wXsNxPf0QdSxN8NJKDwFeZLrXxdY4AwLci_L800DYqKW_CbwEw9V10GbeFBMs4zrNrKMpUQ5MoSFt3AROYKaoqdWi3u6WJzbz3u-NK5FJAeGOtZj1tx1k", {
    //  "opacity":.4,
    //  "visible": false,
   //   });
   var SrOutline =    new AGDMSL("http://www2.graniteschools.org/arcgis/rest/services/SrBoundaries_2/MapServer", {"visible": false});
   //var SrOutline =    new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/AllBoundaryOutlines/MapServer/0", {"visible": false});
   //var SrOutline =    new FeatureLayer("http://www2.graniteschools.org/enterprise/rest/services/AllBoundaryOutlines/FeatureServer/0", {"visible": false});

   var SrPoly =    new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/All_Boundaries/MapServer/0", {"visible": false});

   //elemSite.setInfoTemplates({0: {infoTemplate: SiteTemplate}});
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

    //var addPts = new AGDMSL("http://www2.graniteschools.org/enterprise/rest/services/AddressPopup/MapServer");
    //https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahAddressPoints/FeatureServer/0"

    // var addPts = new FeatureLayer("https://arcgis1.graniteschools.org/server/rest/services/AddressPopup/FeatureServer/0",{
    //     mode: FeatureLayer.MODE_ONDEMAND,
    //     opacity: .5,
    //     visible: true,
    //     InfoTemplate:addTemplate,
    //     outFields: ["FullAdd","City","ZipCode"]
    // });
    // addPts.setScaleRange(3000,0);

    //addPts.setInfoTemplates({0: {infoTemplate: addTemplate}});




    //Add AGRC basemaps pacakge
		terLyr = new  WebTiledLayer('https://discover.agrc.utah.gov/login/path/fuel-cola-scoop-canyon/tiles/terrain_basemap/${level}/${col}/${row}',{maxScale: 8001});
    //terLyr = new  VectorTileLayer('https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer',{maxScale: 8001});
		imgLyr = new  WebTiledLayer('https://discover.agrc.utah.gov/login/path/fuel-cola-scoop-canyon/tiles/utah/${level}/${col}/${row}',{minScale: 8000});
		overLyr = new WebTiledLayer('https://discover.agrc.utah.gov/login/path/fuel-cola-scoop-canyon/tiles/overlay_basemap/${level}/${col}/${row}',{minScale: 8000});
		map.addLayers([terLyr,imgLyr,overLyr]);





    //map.addLayers([elemPoly,JrPoly,SrPoly,busElem,busJr, busSr,elemOutline,JrOutline,SrOutline,elempnt]);
    //map.addLayers([elempnt,elemPoly,JrPoly,SrPoly,busElem,busJr, busSr]);
    //map.addLayers([elemOutline,JrOutline,SrOutline]);
    map.addLayers([elemPoly,JrPoly,SrPoly,busElem,busJr, busSr,JrOutline,SrOutline]);

    map.infoWindow.resize(250,75);


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
      //var inputs = dojo.query('input');
      //for(var i=0; i< inputs.length; i++)
        //inputs[i].value = '';
    }


   dom.byId("clear").on("click", clearAll);





})
