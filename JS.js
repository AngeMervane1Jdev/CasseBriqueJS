 (function commence() {
 var canvas=document.getElementById('cav1');
 
 var vie=5;
   
 var context=canvas.getContext('2d');
 var canvas_x=canvas.getAttribute('width');
 var canvas_y=canvas.getAttribute('height');
 //................variables pour la balle
 var H_hauteur=20;
 var rayon=10;
 var Balle_x=canvas_x/2;
 var Balle_y=canvas_y-rayon-H_hauteur;
 var dx=3;
 var dy=-3;
 //...............variable pour la haquette
 
 var H_largeur=55;
 var H_posX=(canvas_x/2)-(H_largeur/2);
 var H_posY=canvas_y-H_hauteur;
 var H_dx=7;
var point=0;
 //..............variable pour evenement

 document.addEventListener('keyup',keyUp,false);
 document.addEventListener('keydown',keyDown,false);
 var pressGauche=false;
 var pressDroit=false;
 function keyUp(e){
    if (e.keyCode==39) {
       pressDroit=false;
    }
    if (e.keyCode==37) {
       pressGauche=false;
    }
 }
 function keyDown(e) {
    if (e.keyCode==39) {
       pressDroit=true;
    }
    if (e.keyCode==37) {
       pressGauche=true;
    }
 }

 //..............variables pour briques
 var brique_Hauteur=25;
 var brique_Marge=10;
 var brique_Largeur=50;
 var Ligne=3;
 var Colonnes=7;
 var brique_X;
 var brique_Y;
 var brique_decalHaut=10;
 var brique_decalDroit=10;
 var Brique=[];
 for (var t=0;t<Colonnes;t++) {
     Brique[t]=[];
   for(var c=0;c<Ligne;c++){
      Brique[t][c]={x:0,y:0,status:0};
   }
 }
 
 //...............:Principale:................
  
 function Balle() {
   context.beginPath();
   context.fillStyle="white";
   context.arc(Balle_x,Balle_y-1,rayon,0,Math.PI*2);
   context.fill();
   context.closePath();
 }
 
 
 function Haquette() {
   context.beginPath();
   context.fillStyle="red";
   context.rect(H_posX,H_posY,H_largeur,H_hauteur);
   context.fill();
   context.closePath();
 }
 
 function score() {
   
    context.beginPath();
    context.font='20px bold arial';
    context.fillStyle='white';
    context.fillText("score: "+point,70,canvas_y/2);
 }
 function Vie(){
    context.beginPath();
    context.font='20px bold arial';
    context.fillStyle='white';
    context.fillText("Vie: "+vie,canvas_x/2+100,canvas_y/2);
 }
 
 function dessineBriques() {
    for(var c=0;c<Colonnes;c++){
      for(var t=0;t<Ligne;t++)
      {  if (Brique[c][t].status==0){ 
         brique_X=(c*(brique_Largeur+brique_Marge)+brique_decalDroit);
         brique_Y=(t*(brique_Hauteur+brique_Marge)+brique_decalHaut);
         Brique[c][t].x=brique_X;
         Brique[c][t].y=brique_Y;
      
         if (Balle_x+dx>=brique_X && Balle_x+dx<=brique_X+brique_Largeur && Balle_y+dy>=brique_Y-rayon && Balle_y+dy<brique_Y+brique_Hauteur) {
            Brique[c][t].status=1;
            dy=-dy;
            Brique[c][t]={x:0,y:0,status:1};
            point++;}else if (Brique[c][t].status==0) {
         context.beginPath();
         context.fillStyle='yellow';
         context.rect(brique_X,brique_Y,brique_Largeur,brique_Hauteur);
         context.fill();
         context.closePath();
         }
         }
      }
    }
 }

 function gagner() {
    if (point==Colonnes*Ligne) {
      var rep=prompt("BOOMMM  !!!!!!!......: FELICITATION :........\n\t\tVous avez gangné\n Niveau suivant? (O/N)");
      if (rep=='O' || rep=='N') {
         document.location.reload();
         clearInterval(interval);
      }
      else{
         alert("FIN");
          document.location.reload();
          clearInterval(interval);
      }
    }
 }
 
function regule()
   {
       context.clearRect(0,0,canvas_x,canvas_y);
       Balle();
       Haquette();
       dessineBriques();
       score();
       Vie();
      gagner();
      if(pressGauche){
           H_posX-=H_dx;
           if (H_posX<0) {
             H_posX+=H_dx;
           }
      }
      else if(pressDroit){
           H_posX+=H_dx;
           if (H_posX>canvas_x-H_largeur) {
             H_posX-=H_dx;
           }
      }
      if (Balle_x+dx>=canvas_x || Balle_x+dx<=0)
      {
         dx=-dx;
         Balle_x+=dx;
      }
      if (Balle_y+dy<=0)
      {
        dy=-dy;
        Balle_y+=dy;
      }else if (Balle_y+dy>canvas_y && !(Balle_x+dx>H_posX && Balle_x+dx<H_posX+H_largeur && Balle_y+dy>canvas_y-H_hauteur)) {
              vie--;
           if (vie) {
                Balle_x=canvas_x/2;
                 Balle_y=canvas_y-rayon-H_hauteur;
                 dx=3;
                 dy=-3;
                 H_posX=(canvas_x/2)-(H_largeur/2);
                 H_dx=7;
           }
           else{
          alert("GAME OVER \n\t\t\t...........: "+point+" points :..........");
          document.location.reload();
          clearInterval(interval);
           }
      }
      
      if(Balle_x+dx+rayon>=H_posX && Balle_x+dx+rayon<=H_posX+H_largeur && Balle_y+dy+rayon>=canvas_y-H_hauteur){
         dy=-dy;
         Balle_y+=dy;
         }
       else{ 
         Balle_x+=dx;
         Balle_y+=dy;
       }
   }
   var h=0;
   var choix=prompt("Niveau 1-Facile\n2-Diicille\n3Tres dificille\n");
   if(choix==1){
    h=12;
   }
   else if(choix==2){
     h=10;
   }
   else if(choix==3){
    h=8;
   }
   var interval=setInterval(regule,h);
 



 })();
 
 