#Our text classifier, we focused on something simple and light for 3 reasons: easy conversion to JS, light storage and fast predictions

#Importing libraries
import pandas as pd

import keras
from keras.preprocessing.text import Tokenizer
from keras.callbacks import ModelCheckpoint
from keras.preprocessing.sequence import pad_sequences

#Loading the dataset
train_data = pd.read_csv('AI/train.csv')[:10000]

#Extracting the labels
classes = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
y = train_data[classes].values

#Lowercase
train_sentences = train_data["comment_text"].str.lower()

max_features = 5000
max_len = 150
embed_size = 300

#Tokenize (creates a word index, converting the most recurrent words into floats)
tokenizer = Tokenizer(num_words=max_features)
tokenizer.fit_on_texts(train_sentences)

vocab_size = len(tokenizer.word_index) + 1

#Convert the sentences of the dataset into lists of floats using the tokenizer
X_train = tokenizer.texts_to_sequences(train_sentences)

#Pad the lists with zeroes so that every list has the same size to be fed to the neural network
X_train = pad_sequences(X_train, padding='post', maxlen=max_len)

#Simple neural network
model1 = keras.models.Sequential()
model1.add(keras.layers.Embedding(input_dim=vocab_size,output_dim=embed_size,input_length=max_len))
model1.add(keras.layers.Flatten())
model1.add(keras.layers.Dense(100,activation = 'relu'))
model1.add(keras.layers.Dense(10,activation = 'relu'))
 model1.add(keras.layers.Dense(6,activation = 'sigmoid'))

model1.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

saved_model = "newCp.ckpt"
cp_callback = ModelCheckpoint(saved_model, save_weights_only=True, verbose=1, save_best_only=True)

#Training
batch_sz = 32
epoch = 2
model1.fit(X_train, y, batch_size=batch_sz, epochs=epoch, validation_split=0.1, callbacks=[cp_callback])

#Saving the model for conversion to JS
keras.models.save_model(model1,"newModel")

def detect(testList):
    """
    Detects if a text contains insulting, toxic, obscene... content
    :param testList: list of sentences to analyze
    :type testList: List
    :return: [toxic, severe_toxic, obscene, threat, insult, identity_hate] list of floats between 0 and 1, 1 meaning toxic or...
    :rtype: List
    """
    X_test = tokenizer.texts_to_sequences(testList)
    print(X_test)
    X_test = pad_sequences(X_test, padding='post', maxlen=max_len)
    print(X_test)
    return model1.predict(X_test)

#Quick test (Disclaimer: offensive)
print(detect(["nigger","You guys are really dumb","Fuck you!","Hello I am black"," you fucking niggers I hate you"]))