---
title: "ACTION Lab Board Game Rewrite"
author: Jessie Chin, Philo Wang, Sanhorn Chen, Zhifeng Wang
date: Nov 17, 2024
geometry: "left=1in,right=1in,top=1in,bottom=1in"
---

# ACTION Lab Board Game Rewrite Plan Overview

The goal of the rewrite is to fix previous design problems, make components more atomic and clear, and make codes reusable for potentially any future game experiments.

# Goal

The goal is not only to make sure that the application is more robust and the users are able to rejoin the experiment without losing progress but also to build a fairly general framework that can potentially be reused for future similar projects and experiments.

# Timeline

| Task                                                             |   Status    |
| ---------------------------------------------------------------- | :---------: |
| Implement the data collection procedure                          |  in-queue   |
| Design the data collection tables and procedure                  |  in-queue   |
| Fully Implement the server-side game                             | in-progress |
| Fully Implement the client-side                                  | in-progress |
| Verify the client-server communication practice                  |    done     |
| Design the client-server communication practice                  |    done     |
| Verify the server-side runtime player state idea is feasible     |    done     |
| Design the server-side runtime player state data structure       |    done     |
| Verify the client-side page design is feasible                   |    done     |
| Design the client-side page only using '/player/:player_id'      |    done     |
| Try the player id and room id incremental assignment             |    done     |
| Start rewriting the project                                      |    done     |
| Clean the project code based on the previous design              |    done     |
| Add Docker for better development experience and reproducibility |    done     |
| Read the project codes and try to understand the logic           |    done     |

# Rough Steps

0. Preparation

   1. Environment Building

   2. Dependencies Clean Up

   3. Identify Previous Problems and Check Design Feasibility

1. Formalize and Design the Game Implementation

   1. General Server Side Runtime Design, e.g., how the players' information is stored, new player identification numbers are assigned.

   2. General Client Side Runtime Design, e.g., how many "pages" do the client-side have and encoded in which URLs.

   3. Game Implementation Design

   4. Server Client Communication Design

2. Formalize and Design the Game Data Collection

   1. Design Database Schemas.

   2. Insert Data Collection Procedures during Game Processes.

   3. Prepare for Data Analysis.

# Preparation

## Environment Building

Zhifeng has chosen Docker to build the local development environment. Zhifeng expects Docker will not influence or conflict with the future C-Panel deployment.

## Dependencies Clean Up

The previous design used many tools and libraries. For example, TypeScript was expected to be used to check the data types. However, Zhifeng found there were files marked as "no check," and it seemed they were not working correctly for me. In Zhifeng's understanding, the JavaScript "type" comments are sufficient to enable VScode IDE to have "code autofill" functionality. So Zhifeng chose to remove "TypeScript" and some other libraries first.

## Issues

- Database Connection: there are two different ways of interacting with the database in the code. Can we group them into one to make the project more consistent?

Yes. It's done.

- HTTP Endpoint Handling: The previous HTTP Endpoint handling also had two paradigms of design and implementation. Can we reduce it to one to make the project more consistent?

Yes. It's done.

- Is it possible to make a server-state object a high-level abstraction of all the previous `maps`?

It is possible, and I think it's a good practice to separate modules and make them more atomic. For example, with a global server state object as a proxy, the logic of server-state manipulation, e.g., handling new players joining the game, can be completely separated from the "HTTP endpoint" handling logic, i.e., making the code more robust and reusable.

- Is it possible to let the server hold all the player state information, e.g., whether the player needs to submit the demographic information or submit the next game card?

Yes. It's approachable. The client side only needs to hold the player identification number. The client can get the player's state by accessing the endpoint "/player_state"

- The previous implementation uses random number generation to create `player_id` and `room_id`. How should we handle the collision issue?

We can keep track of the number of total players and increment the number when new players join. Same for `room_id`.

- TODO: How do rooms (Computer Player) act differently with respect to different conditions.

- TODO: What information does one game room need to hold?

- TODO: Formalize all the Game State, Room State, and Player State transitions.

- TODO: Formalize all the server-client communications and data transmissions.

- TODO: Even though the room conditions and card information are not data collected from participants, i.e., they are static and do not need to be stored in the database, will storing them in the database make the future data analysis process easier?

- TODO: Do we need to mark the cards being randomly played after the player passes the time limit for future data analysis?

# Formalize and Design the Runtime Game Implementation

## Server Runtime Design

### New Player and Room ID Creation

The previous design uses a random number generation procedure to create IDs for rooms and players. Based on Zhifeng's understanding, this approach might lead to room or player identification number collisions, potentially damaging the research analysis.

Zhifeng's current design loads the number of previous players and rooms from the database and auto increments this number for the future players (currently only in runtime without database).

### Player and Room State Management

This process is in progress.

Zhifeng's design will store and maintain all the players and rooms in two separate lists, and indices will be used to represent the relationship between players and rooms.
For example, the player object will hold an indices representing a room.

When the client requests the full player state, the server will respond with all the necessary information needed by the client side to render the current page, like the current game state, e.g., needing the player to submit their survey response to resume.

## Client Runtime Design

### URLs Design for Single Page Web App

By Zhifeng's understanding, the Single Page Web Application is a web development paradigm aiming to use JavaScript codes to resolve URLs on the client side, i.e., on users' computers and mobile devices, and only requesting unrepeated and necessary resources from the server. Normally, many parts of different pages of a website may be identical, e.g., navigation bars and footers.

Therefore, resolving different URLs is the client-side work. The previous client-side design used URLs to represent different player stages. Based on Zhifeng's understanding, this design might make it difficult for the server side to track the user's player state and might cause unexpected data submissions. For example, a user might accidentally jump back to a previous page by navigating through history or typing in the browser's URL bar.

To avoid accidental resubmitting of data and jumping back, Zhifeng chose to mitigate the game and player state management, e.g., do the user need to submit their demographic information now to the server side.

The current client-side single-page web application design only consists of two pages: "before consent" and "in-experiment".
After clicking the "Agree and proceed button", the server will create a unique player identification number (the total number of participants) for the user, and the client side will automatically navigate to the next page, encoded with the URL "/player/{player_id}", e.g., "/player/10".

## Game Implementation

This process is in progress.

| Steps for one round                  |
| ------------------------------------ |
| Players submit their card selection  |
| Players submit their survey response |

## Communication Implementation

This process is in progress.

The following steps will be specified further in the actual game states.

| Steps                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- |
| The user opens the landing page and clicks to proceed                                                           |
| The client-side code submits to an endpoint requesting a new player ID                                          |
| The server responds and creates a new player                                                                    |
| The client goes to the next page using the player ID                                                            |
| The client establishes a web socket connection with the server                                                  |
| The client uses the web socket to get the initial player state                                                  |
| The client submits Demographic information                                                                      |
| The server updates the player state into waiting for another player                                             |
| The server requests to update the client page with the web socket                                               |
| Another client joins                                                                                            |
| The server creates room for the two (or more) players                                                           |
| The server requests to update client page with the web socket                                                   |
| The first player acts                                                                                           |
| The server updates the room and the first player's state and request to update the first player's page          |
| The second player acts                                                                                          |
| The server updates the room and both players state and request to update both players' pages                    |

# TODO: Formalize and Design the Game Data Collection

This part will be relatively simpler, and most of the previous designs should be the same.

We might need to fix a few points, like using a string data structure to represent `player_id`, which might not be an ideal way for database querying, i.e., having a lot of "player 11111" string might be difficult for us, and the database to select users ranging from id 11111 to 12111 since they are all strings.

## TODO: Design Database Schemas

## TODO: Data Collection during Game

Insert necessary codes into the game logic. Expected to be fairly simple.

## TODO: Data Analysis Preparation

Check if the design is easy for us to export and analyze the data.
