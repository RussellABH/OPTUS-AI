import React from 'react';

//Component to display the Intertopic Distance Map from the html file
const DistanceMap = () => {
    return (
        <iframe
            src="/graphs/topics_100_min.html"
            title="Intertopic Distance Map"
            width="100%"
            height="500px"
            frameBorder="0"
        />
    );
};

export default DistanceMap;