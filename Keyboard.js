const Keyboard={
    elements:{
        main:null,
        keysContainer:null,
        keys:[]
    },

    eventHandlers:{
        oninput: null,
        onclose:null
    },

    properties:{
        value:"",
        capslock:false
    },

    init(){

    //create main elements

    this.elements.main = document.createElement('div');
    this.elements.keysContainer=document.createElement('div');
    
    //setup main elements

    this.elements.main.classList.add("keyboard","keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys= this.elements.keysContainer.querySelectorAll('.keyboard__key')

    //add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main)



    //on browser textarea

    document.querySelectorAll('.use-keyboard-input').forEach(element=>{
        element.addEventListener("focus",()=>{
            this.open(element.value, currrentValue=>{ 
                
                element.value= currrentValue;
            });
        })
    })
    

    },

    _createKeys(){

        const fragment= document.createDocumentFragment();
        const keyLayout=[
            "1", "2abc", "3def", "4ghi", "5jkl", "6mno", "7pqrs", "8tuv", "9wxyz", "0", "*","#",
			"backspace", "space","enter"
        ];
        

        //create html

        const createIconHTML= (icon_name)=>{
            return `<i class="material-icons">${icon_name}</i>`;
        };

        
        
        keyLayout.forEach((key)=>{
          const keyElement = document.createElement('button');
          const insertLineBreak = ["backspace" ,"p","enter","?"].indexOf(key)!==-1;


          //add attributes/classes

          keyElement.setAttribute("type","button");
          keyElement.classList.add("keyboard__key");


            switch(key){

                case "backspace":
                   
                    keyElement.innerHTML=createIconHTML("backspace");
                   
                    keyElement.addEventListener("click",()=>{    
                        this.properties.value= this.properties.value.substring(0,this.properties.value.length-1);
                        this._triggerEvent("oninput");
                        
                    });
                    break;

                    case "caps":
                    keyElement.classList.add('keyboard__key--activatable');
                    keyElement.innerHTML=createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click",()=>{
                        this._toggleCapslock();
                        keyElement.classList.toggle('keyboard__key--active',this.properties.capsLock)
                    });
                    break;

                    
                    case "enter":
                    keyElement.innerHTML=createIconHTML("keyboard_return");

                    keyElement.addEventListener("click",()=>{
                       this.properties.value+="\n";
                       this._triggerEvent("oninput")
                    });
                    break;

                    
                    case "space":
                    keyElement.innerHTML=createIconHTML("space_bar");

                    keyElement.addEventListener("click",()=>{
                        this.properties.value+=" ";
                       this._triggerEvent("oninput");
                    });
                    break;

                    case "done":
                    keyElement.classList.add("keyboard__key--dark");
                    keyElement.innerHTML=createIconHTML("check_circle");

                    keyElement.addEventListener("click",()=>{
                        this.close();
                       this._triggerEvent("onclose");
                    });
                    break;

                    default:
                    var c=0;
                    
                    keyElement.textContent=key.toLowerCase();
                   
                    
                    var timer;
                     keyElement.addEventListener('click',()=>{
                        c++;
                        c=c%(key.length)
                        if(c==0)
                        c++;
                        console.log('click');
                        clearTimeout(timer);
                      timer= setTimeout(()=>{
                            
                            this.properties.value += this.properties.capslock ? key.toUpperCase() : key[c];
                            this._triggerEvent("oninput");  
                            c=0;   
                        },1200);   
                        
                        
                    });
                    keyElement.addEventListener('mousedown',()=>{
                        console.log('mousedown');
                        clearTimeout(timer);
                      timer= setTimeout(()=>{
                            
                            this.properties.value += this.properties.capslock ? key.toUpperCase() : key[0];
                            this._triggerEvent("oninput");     
                        },1200);   
                        
                        
                    })

                    
                    break;

            }
            fragment.appendChild(keyElement);
            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"))
            }
        });
        return fragment;
    },

    _triggerEvent(handlerName){
     if(typeof this.eventHandlers[handlerName]==="function"){
         this.eventHandlers[handlerName](this.properties.value)
     }
    },

    _toggleCapslock(){
       this.properties.capslock= !this.properties.capslock;

       for(const key of this.elements.keys){
           if(key.childElementCount===0){
               key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
           }
       }
    },
  
    open(initialValue,oninput,onclose){
    this.properties.value= initialValue || "";
    this.eventHandlers.oninput =    oninput;
    this.eventHandlers.onclose=onclose;
    this.elements.main.classList.remove("keyboard--hidden")
    },

    close(){
        this.properties.value= "";
        this.eventHandlers.oninput =    oninput;
        this.eventHandlers.onclose=onclose;
        this.elements.main.classList.add("keyboard--hidden")
    }

};

window.addEventListener('DOMContentLoaded',function(){
    Keyboard.init();
    
})