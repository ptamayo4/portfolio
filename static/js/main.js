$(document).ready(function(){
    // startUp();
    var selectedComponent;
    var didStart = false;


    $('#cd-stack').hover(function(){
        console.log("in");
        $('#cd-1').animate({'top': '-450px'})
        $('#cd-3').animate({'top': '-300px'})
        $('#cd-4').animate({'top': '-150px'})
    }, function(){
        console.log("out");
        $('#cd-1').animate({'top': '-0px'})
        $('#cd-3').animate({'top': '-0px'})
        $('#cd-4').animate({'top': '-0px'})
        // $('#cd-2').animate({'top': '6px'})
    })

    $('#proj1').click(function(){
        console.log("clicked");
        console.log($(this));
    });

    $('#monitor').hover(function(){
        if(selectedComponent != 'pc'){
            $( this ).css('opacity', '.5');
        }
    }, function(){
        $( this ).css('opacity', '1');
    })

    var writer = {
        "openTags" : '<pre><output>',
        "closingTags" : '</output></pre>',
        "lineBeginning" : "$> ",
        "cursor" : "<span id='cursor'>|</span>",
        "currString" : "",
        "totalLines" : [],
    }

    var cmds = {
        "bio" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus exercitationem at quod esse? Sit vero architecto error enim facere officia fugiat dicta dolores? Sequi tempore, alias dolores eius nulla delectus.",
        "projects" : "List of projects",
        "ls" : "list stuff",
        "helloworld.txt" : startUp
    }

    // Runs once to start first line
    $('#main').html(writer.openTags + writer.lineBeginning + writer.currString + writer.cursor + writer.closingTags);
     
    $(document).keypress(function(e){
        if(e.key == 'Enter'){
            lineAdder();
        } else {
            writer.currString += e.key;  
        }
        lineDrawer();
    });

    $(document).keydown(function(e){
        if(e.key == 'Backspace'){
            writer.currString = writer.currString.slice(0,writer.currString.length-1);
            lineDrawer();
        }
    });

    $('#monitor').click(function(){
        if(selectedComponent == 'pc'){
            $(this).css({
                'width':'500px',
                'height' : '500px',
                'margin-top' : '-250px',
                'margin-left' : '-250px',
            })
            $('#screen').hide();
            selectedComponent = null;
        } else {
            if(!didStart){
                startUp();
                didStart = true;
            }
            $('#screen').show();
            $(this).css({
                'width':'1500px',
                'height' : '130vh',
                'margin-top' : '-560px',
                'margin-left' : '-750px',
            })
            $('#monitor').css('opacity', '1');
            selectedComponent = 'pc';
        }
    })

    function cmdChecker(currString){
        console.log(currString);
        var newStr;
        if(cmds[currString]){
            if(typeof(cmds[currString]) == 'function'){
                cmds[currString]();
                return;
            } else {
                newStr = cmds[writer.currString];
            }
        } else {
            newStr = currString + ": command not found"
        }
        writer.totalLines.push(writer.openTags + '<span class="print">' +newStr + '</span>' + writer.closingTags);
        lineDrawer();
    }

    function lineAdder(){
        let newLine = writer.openTags + writer.lineBeginning + writer.currString + writer.closingTags;
        writer.totalLines.push(newLine);
        cmdChecker(writer.currString);
        writer.currString = "";
    }

    function lineDrawer(){
        let final = ""
        for(var i = 0; i < writer.totalLines.length; i++){
            final += writer.totalLines[i];
        }
        let newLine = writer.openTags + writer.lineBeginning + writer.currString + writer.cursor + writer.closingTags;
        final += newLine;
        $('#main').html(final);
        window.scrollTo(0,document.body.scrollHeight);
    }

    function startUp(){
        var nameAscii = [
            String.raw`<pre class="print"><outout>__/\\\\\\\\\\\\\____/\\\\\\\\\\\\\\\____/\\\_______________________________        </outout></pre>`,
            String.raw`<pre class="print"><outout> _\/\\\/////////\\\_\///////\\\/////____\/\\\_______________________________       </outout></pre>`,
            String.raw`<pre class="print"><outout>  _\/\\\_______\/\\\_______\/\\\_________\/\\\_______________________________      </outout></pre>`,
            String.raw`<pre class="print"><outout>   _\/\\\\\\\\\\\\\/________\/\\\_________\/\\\______/\\\\\\\\___/\\\____/\\\_     </outout></pre>`,
            String.raw`<pre class="print"><outout>    _\/\\\/////////__________\/\\\____/\\\\\\\\\____/\\\/////\\\_\//\\\__/\\\__    </outout></pre>`,
            String.raw`<pre class="print"><outout>     _\/\\\___________________\/\\\___/\\\////\\\___/\\\\\\\\\\\___\//\\\/\\\___   </outout></pre>`,
            String.raw`<pre class="print"><outout>      _\/\\\___________________\/\\\__\/\\\__\/\\\__\//\\///////_____\//\\\\\____  </outout></pre>`,
            String.raw`<pre class="print"><outout>       _\/\\\___________________\/\\\__\//\\\\\\\/\\__\//\\\\\\\\\\____\//\\\_____ </outout></pre>`,
            String.raw`<pre class="print"><outout>        _\///____________________\///____\///////\//____\//////////______\///______</outout></pre>`,
        ]
        var i = 0;
        var nameInterval = setInterval(function(){
            writer.totalLines.push(nameAscii[i]);
            lineDrawer();
            i++;
            if(i >= nameAscii.length){
                clearInterval(nameInterval);
            }
        }, 200)
    }


    // coffee steam
    function coffeeSteam(){
        // var i = 0;
        var steam_array = $('.steam').toArray();
        setInterval(function(){
            $('.steam').hide()

            var firstSteam = $(steam_array[Math.floor(Math.random() * steam_array.length)]);
            var secondSteam = $(steam_array[Math.floor(Math.random() * steam_array.length)]);
            
            
            firstSteam.css({
                'top' : String(Math.floor(Math.random() * 20) + 50) + 'px',
                'left' : String(Math.floor(Math.random() * 61) + 50) + 'px',
            }) 
            secondSteam.css({
                'top' : String(Math.floor(Math.random() * 61) + 30) + 'px',
                'left' : String(Math.floor(Math.random() * 61) + 55) + 'px',
            }) 
            firstSteam.show()
            secondSteam.show()
            // i++;
            // if(i >= steam_array.length - 1){
            //     i = 0;
            // }
        }, 1200)
    }
    coffeeSteam();
    
});