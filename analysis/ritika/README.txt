The main focuses of the branch are listed as follows:

(1) Tracking the frequencies of words over time. This cleans the words of the submissions data and tracks them over every single month. 
    The resulting output is a JSON file with the 50 most common words for that month. This code can be ofund in the frequencies.ipynb. 

(2) Tracking the topics over time. This uses the bertopic library to track the words over time and generates a respective html graph. 
    This can be found in the bert_topi_time.pynb.

There is also some code that tries to find the average time between posts found in the time_between_posts.ipynb, however this code is not finished.
