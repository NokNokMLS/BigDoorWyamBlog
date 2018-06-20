
var searchModule = function() {
    var idMap = [];
    function y(e) { 
        idMap.push(e); 
    }
    var idx = lunr(function() {
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('description', { boost: 5 });
        this.field('tags', { boost: 50 });
        this.ref('id');

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
    });
    function a(e) { 
        idx.add(e); 
    }

    a({
        id:0,
        title:"test rd service",
        content:"test krakow cemtrum car",
        description:'',
        tags:'keywords'
    });

    a({
        id:1,
        title:"Test Service with Search",
        content:"test service try the search here some more words to search buy sell oscypek",
        description:'',
        tags:'Where I Live'
    });

    a({
        id:2,
        title:"test new fields",
        content:"test new fields should search for krakow bronowice and hair but not this main body content so no results for oscypek",
        description:'',
        tags:'additional search tags'
    });

    y({
        url:'/services/test-3rd-service',
        title:"test 3rd service",
        description:""
    });

    y({
        url:'/services/test-service',
        title:"Test Service with Search",
        description:""
    });

    y({
        url:'/services/test-new-fields',
        title:"test new fields",
        description:""
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
