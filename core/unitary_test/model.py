#Usable form of the model trained in core/engine/model.py

#Importing...
import os
import re
import sys
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt

from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.layers import RNN, GRU, LSTM, Dense, Input, Embedding, Dropout, Activation, concatenate
from keras.layers import Bidirectional, GlobalAveragePooling1D, GlobalMaxPooling1D
from keras.models import Model
from keras.callbacks import EarlyStopping, ModelCheckpoint
from keras import initializers, regularizers, constraints, optimizers, layers

#Recreating the model
train_data = pd.read_csv('AI/train.csv')

classes = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
y = train_data[classes].values

train_sentences = train_data["comment_text"].fillna("fillna").str.lower()

max_features = 100000
max_len = 150
embed_size = 300

tokenizer = Tokenizer(max_features)
tokenizer.fit_on_texts(list(train_sentences))

tokenized_train_sentences = tokenizer.texts_to_sequences(train_sentences)

train_padding = pad_sequences(tokenized_train_sentences, max_len)

word_index = tokenizer.word_index

image_input = Input(shape=(max_len, ))
X = Embedding(max_features, embed_size)(image_input)
X = Bidirectional(GRU(64, return_sequences=True, dropout=0.2, recurrent_dropout=0.2))(X)
avg_pl = GlobalAveragePooling1D()(X)
max_pl = GlobalMaxPooling1D()(X)
conc = concatenate([avg_pl, max_pl])
X = Dense(6, activation="sigmoid")(conc)
model = Model(inputs=image_input, outputs=X)
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.load_weights("cp.ckpt")

### USE THIS ###
def detect(testList):
    """
    Detects if a text contains insulting, toxic, obscene... content
    :param testList: list of sentences to analyze
    :type testList: List
    :return: [toxic, severe_toxic, obscene, threat, insult, identity_hate] list of floats between 0 and 1, 1 meaning toxic or...
    :rtype: List
    """
    test_data = {'text':testList}
    test_data = pd.DataFrame(data=test_data)
    test_sentences = test_data["text"].fillna("fillna").str.lower()
    tokenized_test_sentences = tokenizer.texts_to_sequences(test_sentences)
    test_padding = pad_sequences(tokenized_test_sentences, max_len)
    test_values = model.predict([test_padding],verbose=1)
    return test_values
