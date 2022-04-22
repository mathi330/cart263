# Book Cipher

Mathilde Davan

The idea for this project originated from book ciphers. I wanted to create a puzzle game taking the idea of the book cipher as the primary "level." The player can find the hidden word by figuring out the cipher puzzle. However, I wanted to make my project more interesting by adding more elements and more games/puzzles, letting the player to slowly figure out what the project is about and how to get to the ending. To do that, I made it so that the cipher codes (the code for each letter) were not given from the start, but that the player would have to go through different small games and riddles to get a clue. I wanted to make the small games simple yet fun and try to incorporate many different things that we have seen during the course.

For this project, I wanted to use dialog boxes and try to play around with the idea of many dialog boxes opened at once and try to create the impression of a mess where you have to figure out where things go, the order in which they go and how to use the information you get. I loved the idea of starting with one button with no explanations and just leaving the player to searching what they are supposed to do. I still wanted the games and interactions to be fun and not frustrating so the games are easy once you understand what you have to do, and for the cipher itself, there is still a hint button to help out in case someone struggles to understand how to use the codes they get from the games.

For each time someone plays, a random 6 letter word will be the mystery word to find in the lorem ipsum text. The word's letters are randomly localized in the lorem ipsum text and the "coordinates" of the letters can be found by finishing the games. Once the ending of a game is reached, the canvas will become black with the code appearing in white in the middle. With the 6 clues, the player can find the word in the text. If the word is wrong, they can try again until they get it right, and when the word is correct, the dialog boxes close and three lines of text indicating an imaginary continuation of this treasure hunt appears on the screen.
I liked the idea of leaving the ending opened to let the player imagine what the treasure hunt might lead to in the end. I also thought it was fun to let the person wonder what those last lines might mean or if there is really a continuation to the game.

In terms of problems with the code, I think it struggles to load sometimes and I have to reload the page a couple of times to get it to work...

In terms of libraries and techniques that I used in this project, there are p5, ml5, annyang, JSON and jQuery UI.

For the second clue, the riddle comes from here: https://www.riddlesandanswers.com/v/233435/i-have-no-voice-and-yet-i-speak-to-you-i-tell-of-all-things-in-the-world-that-people-do-i-have-l/
