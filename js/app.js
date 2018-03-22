window.mdc.autoInit();  // initialise Material web components


/*
    Markdown preview
*/
var markdown = document.getElementById('markdown');
var preview = document.getElementById('preview');

markdown.innerText = localStorage['markdown'] || 'Enter text here ...';

var previousContent = '';
// update preview if Markdown has changed
setInterval(function() {
    var currrentContent = markdown.innerText;
    if (previousContent !== currrentContent) {
        preview.innerHTML = marked(currrentContent);
        localStorage['markdown'] = previousContent = currrentContent;
    }
}, 50); // check every 50ms


/*
    Menu
*/
var menuEl = document.querySelector('#toolbar-menu');
var menu = new mdc.menu.MDCMenu(menuEl);

// toggle menu
var toggle = document.querySelector('#toolbar-menu-toggle');
toggle.addEventListener('click', function() {
    menu.open = !menu.open;
});


/*
    FAB
*/
var fab = document.querySelector('#toggle-fab');

var fabIcon = document.querySelector('.mdc-fab__icon');
var previewIsHidden = true;

// handle FAB click
fab.addEventListener('click', function() {
    if (previewIsHidden) {
        preview.style.display = 'block';
        markdown.style.display = 'none';
        fabIcon.innerHTML = 'edit';
    }
    else {
        preview.style.display = 'none';
        markdown.style.display = 'block';
        fabIcon.innerHTML = 'text_format';
    }
    previewIsHidden = !previewIsHidden;
});

// handle screen rotation
window.addEventListener("resize", function() {
    if (window.innerWidth >= 480) {
        preview.style.display = 'block';
        markdown.style.display = 'block';
    }
    else if (previewIsHidden) {
        preview.style.display = 'none';
        markdown.style.display = 'block';
    }
    else {
        preview.style.display = 'block';
        markdown.style.display = 'none';
    }
});
