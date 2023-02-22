//as of 2/21/23, 9 hours

//CHANGELOG 2/20/23
// added simple platform class
// added edges variables for all entities
// added gravity
// added collision for gravity (WIP)

// ------- TO DO --------
// start platform inheritance
// enemies
// melee
//  - hit boxes
//  - animation/delay
// ranged attack
//  - ammo physics?
//  - hitbox/damage


//setting up global vars for manipulating canvas
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

//setting up canvas size to window size
canvas.width = window.innerWidth
canvas.height = window.innerHeight


//player aka ninja cat
class Player
{
    constructor()
    {
        //sets image for player
        this.cat = new Image()
        this.cat.src = "./images/TempCat.png"

        this.spawn()
    }

    //called at game start and when player dies
    spawn()
    {
        //sets/resets player position
        this.position = 
        {
            x: 200,
            y: canvas.height - 100
        }

        //sets/resets edges of player
        this.edge = 
        {
            top: this.position.y,
            bottom: this.position.y + 50,
            left: this.position.x,
            right: this.position.x + 50
        }
    }

    //movement and animations will go here
    moveLeft()
    {
        //could be made into animation loop with frame and break method?
        this.position.x -= 5
    }
    moveRight()
    {
        //insert animation for running right
        
        this.position.x += 5
    }
    jump()
    {
        this.position.y -= 30
    }
    crouch()
    {
        this.position.y += 5
    }

    //attacks
    //melee attack
    melee()
    {

    }

    //ranged attack
    ranged()
    {

    }

    //to plan
    //method for dash
    //method for abilities  

    //all movement and abilities(TBD) for player cat
    update()
    {
        //update postition
        if(keys.w.pressed)
            this.jump()
        if(keys.a.pressed)
            this.moveLeft()
        if(keys.s.pressed)
            this.crouch()
        if(keys.d.pressed)
        {
            this.moveRight()
        }
        if(keys.z.pressed)
        {
            this.position.x += 100
        }

        //update edges of player
        this.edge = 
        {
            top: this.position.y,
            bottom: this.position.y + 50,
            left: this.position.x,
            right: this.position.x + 50
        }
        //insert idle animation method
        this.draw()
    }

    draw()
    {
        context.drawImage(this.cat, this.position.x, this.position.y, 50, 50)
    }
}

//FOR FUTURE (INHERITANCE)
//standard plaforms
//ground platform
class Platform
{
    constructor(x, y, width, height)
    {
        //sets up image for platform INSERT LATER
        // this.platform = new Image()
        // this.platform.src = "./images/TempCat.png"
        
        //set initial position
        this.position = 
        {
            x: x,
            y: y
        }

        //set initial dimensions
        this.width = width
        this.height = height

        //set edges
        this.edge = 
        {
            top: this.position.y,
            bottom: this.position.y + height,
            left: this.position.x,
            right: this.position.x + width
        }

        this.draw()
    }

    draw()
    {
        context.fillStyle = "rgba(131, 101, 57)"; 
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


// INSERT ENEMY CLASS





//create player
const player = new Player()

//testing platforms
const platforms = []
platforms[0] = new Platform(0, canvas.height - 50, canvas.width, 50)
platforms[1] = new Platform(0, canvas.height - 400, canvas.width-500, 50)
const p2 = new Platform(0, canvas.height - 50, canvas.width, 100)




// ----------------------------------------
// ------------ KEYBORD INPUTS ------------
// ----------------------------------------

//keyboard controls monitoring
const keys = 
{
    w: {pressed:false},
    a: {pressed:false},
    s: {pressed:false},
    d: {pressed:false},
    z: {pressed:false}
}

//tracking keydown
addEventListener("keydown", (KeyboardEvent) => 
{
    switch(KeyboardEvent.key)
    {
        case "a":
            keys.a.pressed = true
            break
        case "d":
            keys.d.pressed = true
            break
        case "w":
            keys.w.pressed = true
            break
        case "s":
            keys.s.pressed = true
            break
        case "z":
            keys.z.pressed = true

            break
    }
})

//tracking keyup
addEventListener("keyup", (KeyboardEvent) => 
{
    switch(KeyboardEvent.key)
    {
        case "a":
            keys.a.pressed = false
            break
        case "d":
            keys.d.pressed = false
            break
        case "w":
            keys.w.pressed = false
            break
        case "s":
            keys.s.pressed = false
            break
        case "z":
            keys.z.pressed = false
            player.position.x += 250
            break
    }
})


// GRAVITY for player and enemies
function gravity(entity, platforms)
{
    velocity = 10

    //
    for(let i = 0; i < platforms.length ; i++)
    {
        //if entity is within the platform on x axis
        //let plafrom left edge = A, platform right edge = B, entity left edge = L, and entity right edge = R
        //(A<L<B) || (A<R<B)
        if( (entity.edge.left >= platforms[i].edge.left && entity.edge.left <= platforms[i].edge.right) 
        || (entity.edge.right >= platforms[i].edge.left && entity.edge.right <= platforms[i].edge.right) )
        {
            //gravity collsion
            if(entity.edge.bottom + velocity > platforms[i].edge.top)
            {
                return
            }
            else
            {
                // entity.position.y += velocity
            }
        }
    }
    entity.position.y += velocity

}


// cancels animation
// cancelAnimationFrame(id)
//for idle animation
function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height)

    //if statement if keypress is true keep looping certain animation frames, once not true, come back to this?
    platforms[0].draw()
    platforms[1].draw()
    if(keys.z.pressed)
    {

    }
    else
    {
        player.update()
        player.draw()
    }
    gravity(player, platforms)

    //for each player and object, we need to draw and update method

    //gives identifier for animation frame
    id = requestAnimationFrame(animate)
}

animate()