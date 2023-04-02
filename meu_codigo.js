var x = 256;
var y = 400;//posição inicial heroi
var vel=5//velocidade do heroi
var velini=1 // velocidade do inimigo
var xinimigo=[]//poiscao do inimigo em x
var yinimigo=[]//em Y
var xbonus //posição do bonus
var ybonus=25 //posição do bonus
var vida=3; // vida inicial
var dbala=[]//distancia bala inimigo
var d=[]//distancia heroi inimigo
var dbonus //distancia do heroi a vida 
var colisao=false //colisao
var disparo=false //disparo
var xdis,ydis// posição do siparo
var veldisp=4 // velocidade do disparo
var bala=false
var pontos=0 //contar os pontos
var tt//auxiliar
var t // auxiliar
var ttt=150//auxiliar na contagem das vidas 
var nivel=1
var inimigo=[]// vetor dos inimigos
var bonus=60 // ajudar a contar
var a=50 //ajudar a contar
var aa=1 //auxiliar nos niveis
var up // melhorar nave
var upp// melhorar nave 2
var uppp// melhorar nave 3
var dup //distancia up nave
var upy=25 //posição do up
var upx//
var upa=2//auxiliar up
var upaa=0 // auxiliar up 2
var equip //equipamento 
var cenario //cenario
var cenario2 //cenario2
var cenario3 // cenario3
var ab=2 //diminuir duas nave 2 cenario
var abb=1 // diminuir 1 uma nave 3 cenario
var tela=1 // comecar
var tela2 // inicialização
var tela3 // tela do game over
var tela4 // tela de vencer
var laser // som do disparo
var song // musaica de fundo
var item // som para vida e up nave
var exp // som da explosao da  nave
var expn // explosão nave inimiga   
var expnx,expny //saber lugar onde botar explosão
function preload() {
song = loadSound('sound/music.ogg');//carregar musica fundo
laser= loadSound ('sound/laser.ogg')// som do disparo
item=loadSound('sound/up.ogg'); //som do up
exp=loadSound('sound/exp.ogg');
 heroi = loadImage('img/hero.png');
  cora=loadImage('img/coracao.png');
  chumbo=loadImage('img/tiro.png');
  up=loadImage('img/hero1.png');
  upp=loadImage('img/hero2.png');
  uppp=loadImage('img/hero3.png');
  equip=loadImage('img/equip.png');
  cenario2=loadImage('img/cenario2.png');
  cenario3=loadImage('img/cenario3.png');
  tela3=loadImage('img/gameover.png');
  tela2=loadImage('img/iniciar.png');
  tela4=loadImage('img/vencer.png');
  expn=loadImage('img/explosao.png');
 
	
  for(i=0;i<100;i++){//quantidade de espaços no vetor
	  inimigo[i]=loadImage('img/vilao.png')
  }
  
}
function setup() {
	song.loop(); 
song.setVolume(0.1);//volume da musai de fundo
song.play();// iniciar musica de fundo
	cenario = loadImage("img/cenario.png"); // carrega no setup não da nenhum problema os cenarios
	cenario2=loadImage('img/cenario2.png');
  cenario3=loadImage('img/cenario3.png');
  createCanvas(500, 512);
  background(tela2)
  for(i=0;i<nivel;i++){
  xinimigo[i]=random(0,400)
  yinimigo[i]=50
}
xbonus=random(0,400) // posição aleatoria pro bonus descer
upx=random(0,400)// posicção aleatoria do up

}

function draw() {
	if(tela==0){ // tela game over
		background(tela3,500,512)
		song.stop() // musica para quando perder
	}
	if ( tela == 1) { // criando primeira tela
    background(tela2);
 

    if (keyIsDown(ENTER) ) { // se digitar enter vai pra segunda
		tela=2
	}
}
if(tela==3){
	background(tela4,500,512)
	song.stop(); //musica para quando vencer
	
}
	if(tela==2){
	if(aa<=3){ //cenarios
   background(cenario,500,512);
}else{
if(aa<7){
background(cenario2,500,512);
velini=2 
nivel=nivel-ab //diminuir numero das naveinimiga so uma vez
ab=0
}
else{
	background(cenario3,500,512);
	velini=3
	nivel=nivel-abb // diminuir numero das nave inimiga uma vez
	abb=0
	
}
}

  for(i=0;i<nivel;i++){//movimentação do inimigo
  yinimigo[i]=yinimigo[i]+velini
}
  if (keyIsDown(LEFT_ARROW))
    if(x>=5&&x<=488) // limite da tela
    x-=vel;

  if (keyIsDown(RIGHT_ARROW))
    if(x>=-10&&x<=450) // limite da tela
    x+=vel;
    for(i=0;i<nivel;i++){
		dbala[i]=float(dist(xinimigo[i]+20,yinimigo[i],xdis+10,ydis,))//distancia da bala inimigo
    d[i]= int(dist(xinimigo[i],yinimigo[i],x,y))//distancia inimigo heroi
    if(d[i]<=50){//distancia dos objetos
		colisao=true
		t=i // pra saber qual nave colidiu
	}
	if(dbala[i]<=30){ // colisao bal inimigo acontece aqui
exp.setVolume(0.8); // volume do som
exp.play()
		bala=true
		tt=i
	}
}
if(colisao==true){//colisao inimigo e heroi
	vida=vida-1
if(vida==0){// condição para ultima tela
	tela=0
 }
	colisao=false
	yinimigo[t]=530
}
	if(bala==true){//colisao bala inimigo 
	pontos=pontos+5
	expnx=xinimigo[tt]
	expny=yinimigo[tt]
	bala=false
	disparo=false
	ydis=-111
	yinimigo[tt]=510
	
}
if(yinimigo[tt]>=510&&yinimigo[tt]<=525){ // condição para ele aprecer e tempo de duração
	image(expn,expnx,expny,40,40);
}

for(i=0;i<nivel;i++){
if(yinimigo[i]>=525||(yinimigo[i]>=504&&yinimigo[i]<=509)){//novos alvos e condição para explosao nao acontecer
	yinimigo[i]=25
	  xinimigo[i]=random(0,400)

}
}
if (keyIsDown(32) && (! disparo)) { //disparo
		disparo = true; 
		xdis = x+15;
		ydis = y-40; 
laser.setVolume(0.4);
laser.play()
	}
	if (disparo==true) {;
		ydis = ydis -veldisp;
		if (ydis < 0 ) {
			disparo = false; 
			laser.stop()
			
			
		}
	}//acaba disparo
	if(upaa<=0){	
  image(up,x, y, 50, 50);//herois................................................................
  }
  else{
	  if(upaa==1){ // muda forma da nave
	  image(heroi,x,y,50,50);
	  vel=7
  }else{
	 if(upaa==2){ //mudar forma da nave 
		  image(upp,x,y,50,50)
		  vel=9
		  veldisp=7
	  }else{ // mudar forma da nave
		  image(uppp,x,y,50,50)
		  vel=13
		  veldisp=13
	  }
  }
}
  
if (disparo) {//desenhar bala
		image(chumbo,xdis,ydis,20,50);
	}
	for(i=0;i<nivel;i++){//criandos inimigos
		image(inimigo[i],xinimigo[i],yinimigo[i],40,40)
	}
	if(pontos>=bonus){//condicao para o bonus
		image(cora,xbonus,ybonus,45,45)
		ybonus=ybonus+5
	}
	dbonus=int(dist(x,y,xbonus,ybonus))//distancia pro bonus
	if(dbonus<=40){//colisao bonus
	item.setVolume(0.8); //quando som deve acontecer 
    item.play()
		vida=vida+1
		bonus=bonus+ttt
		ttt=ttt+50
		ybonus=25
		xbonus=random(0,400)
		
	}
		
	if(ybonus>=520){// se não colidir continuar somando 
		ybonus=25
		bonus=bonus+ttt
		ttt=ttt+50
	}
	if(pontos>=a){// aumentando nivel
		a=a+100
		nivel=nivel+1
		aa=aa+1
		if(aa==10){ //condiçao para vencer
			tela=3
		}
		vida=vida +1 //bug ele ta perdendo vida so por isso 
	
	}
	if(aa>=upa&&upaa<=2){//condição para up
		image(equip,upx,upy,20,70)
		upy=upy+5
	}
	dup=int(dist(x,y,upx,upy))
	if(dup<=40){//colisao up heroi
		item.setVolume(0.8); //quando som deve acontecer 
    item.play()
		upa=upa+3
		upaa=upaa+1
		upx=random(0,400)
		upy=25
		
	}
	if(upy>=520){ // se não pegar o up
		upy=25
		upa=upa+1
	}

  textSize(20);// criando texto pra tela
  fill(0)
  stroke(135,206,235);
  text("VIDAS: "+ vida, 20, 500);
   textSize(20);
   fill(0)
  stroke(135,206,235);
  text("PONTOS: "+ pontos, 150, 500);
   textSize(20);
   fill(0)
  stroke(135,206,235);
  text("NIVEL: "+ aa, 290, 500);
   
   
}
}

