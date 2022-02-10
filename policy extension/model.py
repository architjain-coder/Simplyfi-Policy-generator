label = [[1, 'First Party Collection/Use'], 
              [2, 'Third Party Sharing/Collection'], 
              [3, 'User Choice/Control'], 
              [4, 'User Access, Edit and Deletion'], 
              [5, 'Data Retention'],
              [6, 'Data Security'],
              [7, 'Policy Change'], 
              [8, 'Do Not Track'],
              [9, 'International and Specific Audiences'],
              [10, 'Introductory/Generic'],
              [11, 'Privacy contact information'],
              [12, 'Privacy contact information']]

import os
import json
import csv
import pandas as pd
import nltk
from nltk.corpus import stopwords 
from nltk.stem.wordnet import WordNetLemmatizer
import string
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
from sklearn.svm import SVC
import numpy as np
from sklearn.metrics import classification_report
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
nltk.download('wordnet')
def readPolicyFile(fileLocation):
    policySegments = []
    for filename in os.listdir(fileLocation):
        absFilename = "{}/{}".format(fileLocation,filename)
        with open(absFilename) as csv_file:
            #print absFilename
            categoryId = 0
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                if row[5] == "First Party Collection/Use":
                    categoryId = 1
                elif row[5] == "Third Party Sharing/Collection":
                    categoryId = 2
                elif row[5] == "User Choice/Control":
                    categoryId = 3
                elif row[5] == "User Access, Edit and Deletion":
                    categoryId = 4
                elif row[5] == "Data Retention":
                    categoryId = 5
                elif row[5] == "Data Security":
                    categoryId = 6
                elif row[5] == "Policy Change":
                    categoryId = 7
                elif row[5] == "Do Not Track":
                    categoryId = 8 
                elif row[5] == "International and Specific Audiences":
                    categoryId = 9
                elif row[5] == "Introductory/Generic":
                    categoryId = 10
                elif row[5] == "Privacy contact information":
                    categoryId = 11
                elif row[5] == "Practice not covered":
                    categoryId = 12
                else:
                    continue
                    
                policySegment = ''
                jsonData=json.loads(row[6])
                for (k, v) in jsonData.items():
                    for (k, v) in v.items():
                        if k == 'selectedText':
                            policySegment = ''.join(v)
                
                policySegments.append([policySegment, categoryId, row[5]])
            #print policySegments
            #print policySegments
    df = pd.DataFrame(policySegments, columns = ['text', 'label', 'label_name'])
    return df

def cleanDocs(dataFrame):
    cleanNull = dataFrame[dataFrame.text != 'null'].reset_index(drop=True)
    stop = set(stopwords.words('english'))
    exclude = set(string.punctuation) 
    lemma = WordNetLemmatizer()
    clean_docs = []
    bigram_docs = []
    for index, entry in enumerate(cleanNull['text']):
      try:
        stop_free = " ".join([i for i in entry.lower().split() if i not in stop])
        punc_free = ''.join(ch for ch in stop_free if ch not in exclude)
        digit_free = [word for word in punc_free.split() if not word.isdigit() and len(word) > 2]
        normalized = " ".join(lemma.lemmatize(word) for word in digit_free)
        nouns = [word[0] for word in nltk.pos_tag(normalized.split()) if word[1] == 'NN' or word[1] == 'VB']
        cleanNull.loc[index,'text_final'] = str(nouns)
      except:
        pass
	#bigram_transformer = phrases.Phrases(clean_docs)
	
	#for doc in bigram_transformer[clean_docs]:
	#		bigram_docs.append(doc)
    cleanEmpty = cleanNull[cleanNull.text_final != '[]']
    return cleanEmpty

def loadTestDataset(fileName):
    df = pd.read_csv(fileName)
    df=df.dropna()
    return df

def predictLabel(model, corpus):
    
    Tfidf_vect = TfidfVectorizer(max_features=400)
    Tfidf_vect.fit(corpus['text_final'])
    webPolicy_TFidf = Tfidf_vect.transform(corpus['text_final'])
    webPolicyPrediction = model.predict(webPolicy_TFidf)
    
    return webPolicyPrediction,corpus['text_final'];


def mergeData(corpus, predictedResult):
    labels = [[1, 'First Party Collection/Use'], 
              [2, 'Third Party Sharing/Collection'], 
              [3, 'User Choice/Control'], 
              [4, 'User Access, Edit and Deletion'], 
              [5, 'Data Retention'],
              [6, 'Data Security'],
              [7, 'Policy Change'], 
              [8, 'Do Not Track'],
              [9, 'International and Specific Audiences'],
              [10, 'Introductory/Generic'],
              [11, 'Privacy contact information'],
              [12, 'Privacy contact information']]
    
    dfLabel = pd.DataFrame(labels, columns=['label', 'discription'])
    dfPredictedResult = pd.DataFrame(predictedResult)
    dfContact = pd.concat([corpus, dfPredictedResult], axis=1)
    dfContact.columns = ['topic_number', 'corpus', 'label'] 
    return pd.merge(dfContact, dfLabel, on='label')

import pickle
filename = 'policy_model.sav'
# pickle.dump(model, open(filename, 'wb'))
model = pickle.load(open(filename, 'rb'))

def predictPolicyLabel(text):
    print(text)
    data=text *5 
    data = data.split('\n')
    finaldata = []
    for i in data:
        if len(i.split(" "))>1:
            finaldata.append(i)
    # Parse the data, assigning every other row to a different column
    col1 = [str(finaldata[i]) for i in range(0,len(finaldata),2)]
    # Create the data frame
    corpus= pd.DataFrame({'text': col1})
    corpus=corpus['text'].str.replace('\d+', '')
    corpus=corpus.dropna()
    corpus.to_csv("out.csv",index=False)
    corpus = loadTestDataset("out.csv")
    k,textFinal= predictLabel(model, cleanDocs(corpus))
    l=list(k)
    finalResult = pd.DataFrame()
    finalLabel = [label[i][1] for i in l]
    finalResult["text"] =  corpus["text"]
    finalResult["Label"] = finalLabel
    return finalResult


text= """
The Twitter rules: safety, privacy, authenticity, and more
Skip to main content
Help Center
The Twitter Rules
Twitter's purpose is to serve the public conversation. Violence, harassment and other similar types of behavior discourage people from expressing themselves, and ultimately diminish the value of global public conversation. Our rules are to ensure all people can participate in the public conversation freely and safely.
Safety
Violence: You may not threaten violence against an individual or a group of people. We also prohibit the glorification of violence. Learn more about our violent threat and glorification of violence policies.
Terrorism/violent extremism: You may not threaten or promote terrorism or violent extremism. Learn more.
Child sexual exploitation: We have zero tolerance for child sexual exploitation on Twitter. Learn more.
Abuse/harassment: You may not engage in the targeted harassment of someone, or incite other people to do so. This includes wishing or hoping that someone experiences physical harm. Learn more.
Hateful conduct: You may not promote violence against, threaten, or harass other people on the basis of race, ethnicity, national origin, caste, sexual orientation, gender, gender identity, religious affiliation, age, disability, or serious disease. Learn more.
Suicide or self-harm: You may not promote or encourage suicide or self-harm. Learn more.
Sensitive media, including graphic violence and adult content: You may not post media that is excessively gory or share violent or adult content within live video or in profile or header images. Media depicting sexual violence and/or assault is also not permitted. Learn more.
Illegal or certain regulated goods or services: You may not use our service for any unlawful purpose or in furtherance of illegal activities. This includes selling, buying, or facilitating transactions in illegal goods or services, as well as certain types of regulated goods or services. Learn more.
Privacy
Private information: You may not publish or post other people's private information (such as home phone number and address) without their express authorization and permission. We also prohibit threatening to expose private information or incentivizing others to do so. Learn more.
Non-consensual nudity: You may not post or share intimate photos or videos of someone that were produced or distributed without their consent. Learn more.
Authenticity
Platform manipulation and spam: You may not use Twitter’s services in a manner intended to artificially amplify or suppress information or engage in behavior that manipulates or disrupts people’s experience on Twitter. Learn more.
Civic Integrity: You may not use Twitter’s services for the purpose of manipulating or interfering in elections or other civic processes. This includes posting or sharing content that may suppress participation or mislead people about when, where, or how to participate in a civic process. Learn more.
Impersonation: You may not impersonate individuals, groups, or organizations in a manner that is intended to or does mislead, confuse, or deceive others. Learn more.
Synthetic and manipulated media: You may not deceptively share synthetic or manipulated media that are likely to cause harm. In addition, we may label Tweets containing synthetic and manipulated media to help people understand their authenticity and to provide additional context. Learn more.
Copyright and trademark: You may not violate others’ intellectual property rights, including copyright and trademark. Learn more about our trademark policy and copyright policy.
Enforcement and Appeals
Learn more about our approach to enforcement, including potential consequences for violating these rules or attempting to circumvent enforcement, as well as how to appeal.
Third-party advertising in video content
You may not submit, post, or display any video content on or through our services that includes third-party advertising, such as pre-roll video ads or sponsorship graphics, without our prior consent.
Note: we may need to change these rules from time to time in order to support our goal of promoting a healthy public conversation. The most current version is always available at https://twitter.com/rules.
Share this article
Tweet
Twitter platform
Twitter.com
Status
Card validator
Privacy Center
Transparency Center
Twitter, Inc.
About the company
Twitter for Good
Company news
Brand toolkit
Jobs and internships
Investors
Help
Help Center
Using Twitter
Twitter Media
Ads Help Center
Managing your account
Email Preference Center
Rules and policies
Contact us
Developer resources
Developer home
Documentation
Forums
Communities
Developer blog
Engineering blog
Developer terms
Business resources
Advertise
Twitter for business
Resources and guides
Twitter for marketers
Marketing insights
Brand inspiration
Twitter Data
Twitter Flight School
© 2021 Twitter, Inc.
Cookies
Privacy
Terms and conditions
English
Help Center
English
Español
日本語
한국어
Português
Deutsch
Türkçe
Français
Italiano
"""
#predictPolicyLabel(text).to_csv("result.csv")