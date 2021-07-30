var canvas=document.getElementById('cav1');
var X=canvas.getAttribute('width');
var Y=canvas.getAttribute('height');
var context=canvas.getContext('2d');
//variables de la haquette
var hak_largeur=50;
var hak_hauteur=10;
var hak_y=Y-hak_hauteur;
var hak_x=X/2-hak_largeur/2;
//variables de la balle
var rayon=12;
var x_bal=X/2;
var y_bal=Y-hak_hauteur-rayon;
var dx=2;
var dy=-2;
//variables de bouton
document.addEventListener('keyup',keyup,false);
document.addEventListener('keydown',keydown,false);
var goleft=false;
var gorigth=false;
//variables de Briques
var column=3;
var ligne=6;
var marge_b=10;
var hauteur_b=20;
var large_b=50;
var decHaut=5;
var decDroit=10;
var X_d,Y_d;
var Brique=[];
for(var c=0;c<column;c++){
   Brique[c]=[];
   for(var t=0;t<ligne;t++){
    Brique[c][t]={x:0,y:0,status:0};
    
   }
}
function dessineB(){
    for( var c=0;c<column;c++){
        for(var t=0;t<ligne;t++){
            if(Brique[c][t].status==0){
             X_d=t*(large_b+marge_b)+decDroit;
             Y_d=c*(hauteur_b+marge_b)+decHaut;
            if((y_bal+dy-rayon-Y_d==0 || y_bal+dy-rayon<=Y_d+hauteur_b) && ((x_bal+dx-rayon<=X_d+large_b &&  x_bal+dx-rayon>=X_d)||(x_bal+dx+rayon>=X_d)))
               {
                 Brique[c][t].status=1;
                 dy=-dy;
               }
            }
            if(Brique[c][t].status==0){
               Brique[c][t].x=X_d;
               Brique[c][t].y=Y_d;
               context.beginPath();
               context.fillStyle='#B2D657';
               context.rect(X_d,Y_d,large_b,hauteur_b);
               context.fill();
               context.closePath();
            }
            
        }
   }
}
function keyup(e){
    if(e.keyCode==39){
        gorigth=false;
    }
    if(e.keyCode==37){
        goleft=false;
    }
}
function keydown(e){
    if(e.keyCode==39){
        gorigth=true;
    }
    if(e.keyCode==37){
        goleft=true;
    }
}

function drawBall(){
    context.beginPath();
    context.arc(x_bal,y_bal,rayon,0,Math.PI*2);
    context.fillStyle='blue';
    context.fill();
    context.closePath();
}
function drawhaquette(){
    context.beginPath();
    context.rect(hak_x,hak_y,hak_largeur,hak_hauteur);
    context.fillStyle='red';
    context.fill();
    context.closePath(); 
}

function moteur(){
    context.clearRect(0,0,X,Y);
    drawBall();
    dessineB();
    drawhaquette();
    if(y_bal+dy+rayon>=hak_y && x_bal+dx<=hak_x+hak_largeur && x_bal+dx+rayon>=hak_x || y_bal+dy+rayon>=hak_y && x_bal+dx-rayon>hak_x && x_bal+dx-rayon<=hak_x+hak_largeur){
        dy=-dy;
    }
    if(x_bal+dx>X-rayon || x_bal+dx-rayon<=0){
        dx=-dx;
    }
    if(y_bal+dy-rayon<=0){
        dy=-dy;
    }
    if(goleft){
        hak_x-=5;
        if(hak_x<0){
          hak_x+=5;  
        }
    }
    if(gorigth){
       
     hak_x+=5;
    if(hak_x>X-hak_largeur){
     hak_x-=5;
        }
     }
     if(y_bal+dy>Y)
       {
            alert("Fin");
        document.locationReload();
       }
     
    y_bal+=dy;
    
    x_bal+=dx;
}
setInterval(moteur,10);
