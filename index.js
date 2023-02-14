//as of 2/13/23 spent 5.75 hours

// ------- TO DO --------
// finish movement
// start platforms and or git hub

// next session = code platform, finish movement
// next next set up github
// figure out animation flowchart


//setting up global vars for manipulating canvas
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

//setting up canvas size to window size
canvas.width = window.innerWidth
canvas.height = window.innerHeight


//need platforms of different types
    //standard platforms
    //ground
    //tall platforms for wall climb and jumps
    //building platform/wall as boarder for next scenario
//need enemies
    //basic goombas for now

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

        //spawn player size 50 x 50
        context.drawImage(this.cat, this.position.x, this.position.y, 50, 50)
    }

    //movement and animations will go here
    moveLeft() //a = 65
    {
        //could be made into animation loop with frame and break method?
        this.position.x -= 5
    }

    moveRight() //d = 68
    {
        this.position.x += 5
    }

    jump() //w =87
    {
        this.position.y -= 5
    }

    crouch() //s = 83
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
        //need dash condition

        if(keys.w.pressed)
            this.jump()
        if(keys.a.pressed)
            this.moveLeft()
        if(keys.s.pressed)
            this.crouch()
        if(keys.d.pressed)
            this.moveRight()

        //insert idle animation method
    }

    draw()
    {
        context.drawImage(this.cat, this.position.x, this.position.y, 50, 50)
    }
}

//insert platform class HERE


//create player
const player = new Player()

// ----------------------------------------
// ------------ KEYBORD INPUTS ------------
// ----------------------------------------

//keyboard controls monitoring
const keys = 
{
    w: {pressed:false},
    a: {pressed:false},
    s: {pressed:false},
    d: {pressed:false}
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
    }
})


// cancels animation
// cancelAnimationFrame(id)
//for idle animation
function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height)

    //if statement if keypress is true keep looping certain animation frames, once not true, come back to this?

    player.update()
    player.draw()

    //for each player and object, we need to draw and update method

    //gives identifier for animation frame
    id = requestAnimationFrame(animate)
}

animate()