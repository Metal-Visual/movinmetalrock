
var toc_config = {
    url: 'https://movinmetalrockofficial.blogspot.com/',
    containerId: 'table-of-content',
    showNew: 02,
    newText: ' &ndash; <em style="color: white;padding: 1px 5px;border-radius: 20px;background-color: #9c0606;text-shadow: 01px 01px 01px #000;">Recente!</em>',
    sortAlphabetically: {
        thePanel: false,
        theList: false
    },
    maxResults: 9999,
    activePanel: 1,
    slideSpeed: {
        down: 400,
        up: 400
        
    },
    slideEasing: {
        down: null,
        up: null
    },
    slideCallback: {
        down: function() {},
        up: function() {}
    },
    clickCallback: function() {},
    jsonCallback: '_toc',
    delayLoading: 0
};

(function(w, d) {
 var cont = d.getElementById(toc_config.containerId),
  head = d.getElementsByTagName('head')[0],
  category = [];
 w[toc_config.jsonCallback] = function(json) {
  var entry = json.feed.entry,
   cat = json.feed.category,
   title, link, label, skeleton = "";
  for (var h = 0, hen = cat.length; h < hen; ++h) {
   category.push(cat[h].term);
  }
  for (var f = 0, fen = entry.length; f < fen; ++f) {
   if (toc_config.showNew || toc_config.showNew > 0) {
    if (f < toc_config.showNew + 1) {
     entry[f].title.$t += ' %new%';
    }
   }
  }
  entry = (toc_config.sortAlphabetically.theList) ? entry.sort(function(a, b) {
   return (a.title.$t.localeCompare(b.title.$t));
  }) : entry;

  if (toc_config.sortAlphabetically.thePanel) category.sort();
  for (var g = 0, gen = category.length; g < gen; ++g) {
   skeleton += '<h2 class="toc-header"><i class="fa fa-tag" aria-hidden="true"></i> ' + category[g] + '</h2>';
   skeleton += '<div class="toc-content">';
   for (var i = 0, ien = entry.length; i < ien; ++i) {
    title = entry[i].title.$t;
    for (var j = 0, jen = entry[i].link.length; j < jen; ++j) {
     if (entry[i].link[j].rel == "alternate") {
      link = entry[i].link[j].href;
      break;
     }
    }
    for (var k = 0, ken = entry[i].category.length; k < ken; ++k) {
     if (category[g] == entry[i].category[k].term) {
      skeleton += '<li><a href="' + link + '">' + title.replace(/ \%new\%$/, "") + '</a>' + (title.match(/\%new\%/) ? ' ' + toc_config.newText : '') + '</li>';
     }
    }
   }
   skeleton += '</div>';
  }

  cont.innerHTML = skeleton;
  if (typeof jQuery != 'undefined') {
   $('#' + toc_config.containerId + ' .toc-content').hide();
   $('#' + toc_config.containerId + ' .toc-header').click(function() {
    if ($(this).hasClass('active')) return;
    toc_config.clickCallback(this);
    $('#' + toc_config.containerId + ' .toc-header').removeClass('active').next().slideUp(toc_config.slideSpeed.up, toc_config.slideEasing.up, toc_config.slideCallback.up);
    $(this).addClass('active').next().slideDown(toc_config.slideSpeed.down, toc_config.slideEasing.down, toc_config.slideCallback.down);
   }).eq(toc_config.activePanel - 1).addClass('active').next().slideDown(toc_config.slideSpeed.down, toc_config.slideEasing.down, toc_config.slideCallback.down);
  }
 };
 var s = d.createElement('script');
 s.src = toc_config.url.replace(/\/$/, "") + '/feeds/posts/summary?alt=json-in-script&max-results=' + toc_config.maxResults + '&callback=' + toc_config.jsonCallback;
 if (toc_config.delayLoading == "onload") {
  w.onload = function() {
   head.appendChild(s);
  };
 } else {
  w.setTimeout(function() {
   head.appendChild(s);
  }, toc_config.delayLoading);
 }
})(window, document);