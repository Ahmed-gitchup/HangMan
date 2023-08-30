import random

# قائمة الكلمات الممكنة
words = ["BMI", "Contact", "Piano", "Fibonacci", "Shipe", "CV",]

# اختيار كلمة عشوائية من القائمة
word = random.choice(words)

guesses = []
maxWrongGuesses = 6
wrongGuesses = 0

# عرض الكلمة بشكل صحيح والحروف الفارغة
def display_word():
    displayed_word = ""
    for letter in word:
        if letter in guesses:
            displayed_word += letter + " "
        else:
            displayed_word += "_ "
    print(displayed_word)

# فحص ما إذا كانت اللعبة قد انتهت بالفوز
def check_win():
    for letter in word:
        if letter not in guesses:
            return False
    return True

# رسم صورة الجلادة بناءً على عدد الخطأ
def draw_hangman():
    stages = [
        '''
           --------
           |      |
           |
           |
           |
           |
           -
        '''
        , 
        '''
           --------
           |      |
           |      O
           |
           |
           |
           -
        '''
        ,
        '''
           --------
           |      |
           |      O
           |      |
           |      |
           |
           -
        '''
        ,
        '''
           --------
           |      |
           |      O
           |     \\|
           |      |
           |
           -
        '''
        ,
        '''
           --------
           |      |
           |      O
           |     \\|/
           |      |
           |
           -
        '''
        ,
            '''
           --------
           |      |
           |      O
           |     \\|/
           |      |
           |     /
           -
        '''
       ,
        '''
           --------
           |      |
           |      O
           |     \\|/
           |      |
           |     / \\
           -
        '''
    ]
    return stages[wrongGuesses]

print("Welcome to Hangman!")
display_word()

while not check_win() and wrongGuesses < maxWrongGuesses:
    letter = input("Guess a letter: ").lower()

    if letter in guesses:
        print("You already guessed that letter!")
        continue

    guesses.append(letter)

    if letter not in word:
        wrongGuesses += 1
        print(draw_hangman())

    display_word()

if check_win():
    print("Congratulations! You won!")
else:
    print("Game over! The word was:", word)