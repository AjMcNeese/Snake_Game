const canvas=document.getElementById('game');
      const ctx=canvas.getContext('2d');
      //increase snake size 
      class snakePart{
      constructor(x, y){
          this.x=x;
          this.y=y;
      }
      
      }
      
      let speed=10;
      let tileCount=20; 
      
      let tileSize=canvas.clientWidth/tileCount-2;
      let headX=10;
      let headY=10;
      
      // array for snake parts
      const snakeParts=[];
      let tailLength=2;
      
      //initialize the speed of snake
      let xvelocity=0;
      let yvelocity=0;
      
      //draw apple
      let appleX=5;
      let appleY=5;
      
      //scores
      let score=0;
      
      // create game loop to continuously update screen
      //function to start and render the game
      function drawGame(){
          changeSnakePosition();
          // game over logic
          let result=isGameOver();
          if(result){
              return;
          }
          clearScreen();
          drawSnake();
          drawApple();
        
          checkCollision()
          drawScore();
          setTimeout(drawGame, 1000/speed);
      }
      //Game Over function
      function isGameOver(){
          let gameOver=false; 
         
          if(yvelocity===0 && xvelocity===0){
              return false;
          }
          if(headX<0){
              gameOver=true;
          }
          else if(headX===tileCount){
              gameOver=true;
          }
          else if(headY<0){
              gameOver=true;
          }
          else if(headY===tileCount){
              gameOver=true;
          }
      
          
      
           for(let i=0; i<snakeParts.length;i++){
               let part=snakeParts[i];
               if(part.x===headX && part.y===headY){
                   gameOver=true;
                   break;
               }
           }
          
      
          //display text Game Over
          if(gameOver){
           ctx.fillStyle="white";
           ctx.font="50px verdana";
           ctx.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);

           let confirmStatus;
           //if logic to check if user wants to play game again
           if(confirm("Play again!") == true){
            window.location.reload()
            
           } else {
            return;
           }
          }
      
          return gameOver;
      }
      
      // score function
      function drawScore(){
      ctx.fillStyle="white"
      ctx.font="10px verdena"
      ctx.fillText("Score: " +score, canvas.clientWidth-50,10);
      
      }
      
      // clear our screen
       function clearScreen(){
      
      ctx.fillStyle= 'black'// make screen black
      ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)
       }
       function drawSnake(){
          
          ctx.fillStyle="green";
          //loop through our snakeparts array and render the snake parts
          for(let i=0;i<snakeParts.length;i++){
              //draw snake parts
              let part=snakeParts[i]
               ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize,tileSize)
          }
          //add parts to snake --through push
          snakeParts.push(new snakePart(headX,headY));
          if(snakeParts.length>tailLength){
              snakeParts.shift();
      
          }
          ctx.fillStyle="orange";
          ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize)
      
      
       }
       function changeSnakePosition(){
           headX=headX + xvelocity;
           headY=headY+ yvelocity;
           
       }
       function drawApple(){
           ctx.fillStyle="red";
           ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
       }
       
       function checkCollision(){
           if(appleX==headX && appleY==headY){
               appleX=Math.floor(Math.random()*tileCount);
               appleY=Math.floor(Math.random()*tileCount);
               tailLength++;
               score++; 
      
           }
       }
       //add event listener to our body
       document.body.addEventListener('keydown', keyDown);
      

       //event listener to listen for key input and change direction of snake
      function keyDown()

       
      //up
      {
        console.log(event.keyCode)
          if(event.keyCode==38){
              
              if(yvelocity==1)
              return;
              yvelocity=-1;
              xvelocity=0;
              
          }
          //down
          if(event.keyCode==40){
              if(yvelocity==-1)
              return;
              yvelocity=1;
              xvelocity=0;
          }
      
      //left
          if(event.keyCode==37){
              if(xvelocity==1)
              return;
              yvelocity=0;
              xvelocity=-1;
          }
          //right
          if(event.keyCode==39){
              if(xvelocity==-1)
              return;
              yvelocity=0;
              xvelocity=1;
          }
      }
      
       drawGame(); 