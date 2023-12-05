import React from 'react';

//Component to display the Bert Topic Graph from the html file
const BertTopicGraph = () => {
    return (
        <iframe
            src="/graphs/bert_topics_over_time.html"
            title="Bert Topic Graph"
            width="100%"
            height="500px"
            frameBorder="0"
        />
    );
};

export default BertTopicGraph;