import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from nltk.stem import SnowballStemmer 

import sys
question=""
if __name__ == "__main__":
    # Check if at least one command-line argument (the question) is provided
    if len(sys.argv) < 2:
        print("Usage: python charusat_faq.py <question>")
        sys.exit(1)

    # Extract the question from the command-line arguments
    question = " ".join(sys.argv[1:])

   
user_query = question

file_path = r"C:\Users\Dell\Downloads\charusat faq\charusat faq\server\faq_dataset1.csv"
df = pd.read_csv(file_path)

questions=df["question"].tolist()
answers=df["answer"].tolist()


nlp = spacy.load("en_core_web_sm")
stemmer = SnowballStemmer("english")  # Use SnowballStemmer for English

def extract_and_stem_keywords(text):
    doc = nlp(text)
    stemmed_keywords = [stemmer.stem(token.text.lower()) for token in doc if not token.is_stop and token.is_alpha]
    return " ".join(stemmed_keywords)

preprocessed_user_query = extract_and_stem_keywords(user_query)
preprocessed_questions = [extract_and_stem_keywords(question) for question in questions]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(preprocessed_questions + [preprocessed_user_query])

cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
similarity_threshold = 0.3

most_similar_idx = cosine_similarities.argmax()

if cosine_similarities[0][most_similar_idx] >= similarity_threshold:
    answer = answers[most_similar_idx]
    quest=questions[most_similar_idx]
else:
    answer = "Sorry, I don't know."

print(answer)

# import spacy
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import pandas as pd
# import sys

# # Load English language model from spaCy
# nlp = spacy.load("en_core_web_sm")

# # Function to extract and lemmatize keywords from text
# def extract_and_lemmatize_keywords(text):
#     doc = nlp(text)
#     lemmatized_keywords = [token.lemma_ for token in doc if not token.is_stop and token.is_alpha]
#     return " ".join(lemmatized_keywords)

# if __name__ == "__main__":
#     # Check if at least one command-line argument (the question) is provided
#     if len(sys.argv) < 2:
#         print("Usage: python charusat_faq.py <question>")
#         sys.exit(1)

#     # Extract the question from the command-line arguments
#     question = " ".join(sys.argv[1:])

#     # Read the FAQ dataset
#     file_path = r"C:\Users\Dell\Downloads\charusat faq\charusat faq\server\faq_dataset1.csv"
#     df = pd.read_csv(file_path)

#     # Extract questions and answers from the dataset
#     questions = df["question"].tolist()
#     answers = df["answer"].tolist()

#     # Preprocess user query
#     preprocessed_user_query = extract_and_lemmatize_keywords(question)

#     # Preprocess questions from the dataset
#     preprocessed_questions = [extract_and_lemmatize_keywords(question) for question in questions]

#     # Initialize and fit TF-IDF vectorizer
#     vectorizer = TfidfVectorizer()
#     tfidf_matrix = vectorizer.fit_transform(preprocessed_questions + [preprocessed_user_query])

#     # Compute cosine similarities
#     cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
#     similarity_threshold = 0.3

#     # Find the most similar question index
#     most_similar_idx = cosine_similarities.argmax()

#     # Check if the most similar question meets the similarity threshold
#     if cosine_similarities[0][most_similar_idx] >= similarity_threshold:
#         answer = answers[most_similar_idx]
#     else:
#         answer = "Sorry, I don't know."

#     print(answer)
