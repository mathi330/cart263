# Night at the Movies, Arrival

Mathilde Davan

This project is a program inspired by the movie Arrival directed by Denis Villeneuve. It takes the main element of the film, the language of the aliens that the protagonist, Louise Banks, tries to translate.
A reason for my choice of movie was my love for the aesthetic of the alien language in the movie and the circular shape. Another reason was my curiosity as to how I could create a new alphabet through code and combine the letters to make a word.
I wanted to keep the idea of a circular language like in the movie and experiment with the shape to create an interesting design for the "language" or, more exactly, the alphabet from my program (although the alphabet is changing for every new word).
I also wanted to make it my own by only using the film as an inspiration and not try to completely copy the design ideas of the movie. In that optic, I decided to try to experiment with circles instead of line and curves (which was also easier than going for a calligraphic look).

The goal of the "game" is to decode the word appearing. There is no actual reward, or point count other than the satisfaction of finding the word and seeing the interesting design created (and maybe learn a new word?).
The interaction with the program is completely vocal through annyang. The decoder can go from the introduction to the decoding page by saying "start" and go back the same way. They can also ask for a new word to translate by saying "next" and ask for a hint by saying "help."
I thought it was interesting to make it oral instead of keyboard interactions to have two sides of language in the program: written and oral.

The program also uses JSON data from which a word is randomly selected. The words are taken from four files of Darius Kazemi's corpora.

Sources for the JSON (all put together into one JSON file):
https://github.com/dariusk/corpora/blob/master/data/words/common.json
https://github.com/dariusk/corpora/blob/master/data/words/encouraging_words.json
https://github.com/dariusk/corpora/blob/master/data/words/adjs.json
https://github.com/dariusk/corpora/blob/master/data/words/strange_words.json
