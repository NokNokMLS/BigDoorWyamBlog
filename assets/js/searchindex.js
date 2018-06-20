
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
        title:"test new fields",
        content:"test new fields should search for krakow bronowice and hair but not this main body content so no results for oscypek",
        description:'',
        tags:'additional search tags'
    });

    a({
        id:1,
        title:"test service",
        content:"Can you help your fellow expats and promote your business interests for free If you are already living in Poland please send us details of your area in English and or your native language An example of the information that would be helpful can be found here https bigdoor pl blog posts -where-i-live-john-naughton-krakow-rzaska html Simply email your contribution to easier bigdoor pl and we will do the rest Big Thanks",
        description:"krakow",
        tags:'Where I Live'
    });

    a({
        id:2,
        title:"test rd service",
        content:"test krakow cemtrum car",
        description:'',
        tags:'keywords'
    });

    y({
        url:'/BigDoorWyamBlog/services/test-new-fields',
        title:"test new fields",
        description:""
    });

    y({
        url:'/BigDoorWyamBlog/services/test-service',
        title:"test service",
        description:"krakow"
    });

    y({
        url:'/BigDoorWyamBlog/services/test-3rd-service',
        title:"test 3rd service",
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
