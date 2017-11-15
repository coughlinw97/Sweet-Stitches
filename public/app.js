let links = document.getElementsByClassName('nav-link');

function makeActive() {
    links.forEach(function(link){
        if(link.classList.contains('active')){
            link.classList.remove('active');
        };
    this.classList.add('active');
    });
    return null;
};

links.addEventListener.onclick(function(){
    makeActive();
});

console.log('Connected to js file');