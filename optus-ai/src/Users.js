import React  from "react";
import './Users.css';


function Users() {
    return (
      <div className="users-background">
        <h1 className="users-title">User Analysis</h1>
        <p className="users-header">This section of the website showcases a few highly active users in the timeframe we were taking a look at. These users show a story of how social media discourse online can help individuals turn their lives around and get clean. These users were selected to show their story, and how sentiment analysis can show the ups and downs of their stories. All users will be kept anonymous for the sake of anonymity.</p>
        
        <div className="users-section">
          <h3 className="users-name">User 1</h3>
          <p className="users-description">This user has been active over the course of 5 years, posting nearly 150 times. Embarking on a tumultuous journey, the individual's narrative unfolds in a raw and poignant chronicle marked by the struggles of addiction, homelessness, and brushes with the law. Their post in January of 2017 became a pivotal moment as they expressed anticipation for a rehab opportunity, eagerly awaiting news of a chemical assessment. Their post in April of 2018 introduces a note of vulnerability, questioning the potential repercussions of a relapse on their progress at the clinic. Amidst the challenges, there's a beacon of hope as they share, "I got my results. I have a bed waiting for tomorrow at a program!!! I'm kinda relieved because I'd drop dirty for a few things just today." The story climaxes with an inspiring twist in one of their last posts in August of 2018, where the individual, having conquered over a year of sobriety, is elated about a job offer at a treatment center, symbolizing a remarkable turnaround. This narrative encapsulates themes of recovery, guilt, and personal growth, portraying a compelling saga of resilience and transformation.</p>
          <img src="/images/user1.png" alt="User 1" className="user-image" />
          <p className="users-description">With this graph, we can see that over time this user's sentiment did increase over their most significant posts. After becoming clean and getting a job, their significant posts showed an overall increase in their sentiment.</p>
        </div>
        
        <div className="users-section">
          <h3 className="users-name">User 2</h3>
          <p className="users-description">This user's story took place over 4 years. Amidst the struggles and losses detailed in their posts in December of 2016, a pivotal moment surfaces, illustrating the protagonist's role in saving a friend with Narcan. As the narrative progresses, the individual exudes gratitude for supportive friends and signals a newfound sense of optimism. The power of online discourse becomes evident, culminating in their last post, where the individual expresses a genuine desire to break free from opioids and embraces the potential for a healthier future. Despite the non-linear presentation, the narrative effectively captures the transformative impact of communal support in the journey towards recovery.</p>
          <img src="/images/user2.png" alt="User 2" className="user-image" />
          <p className="users-description">In this user's situation, they are not done with their road to recovery and are on their way up. In their last post, they had a strong desire to quit due to their situation, which is finally breaking away from their norm.</p>
        </div>

        <h3 className="users-name">User 3</h3>
        <p className="users-description">Early posts reflect a sense of victimhood and chronic pain while battling opiates. At the 8.5-month mark, faced with relapse temptations, the person makes a crucial decision to move into sober living. They express newfound empowerment, celebrate one year of sobriety, and face the ongoing challenge of depression. Despite hitting 17 months clean, there's a poignant admission of jealousy and a desire to use. In Post 387, the individual shares pride in a friend's recovery, illustrating a positive impact on their support network. The story, marked by milestones and vulnerabilities, paints a complex picture of addiction, recovery, and the ongoing effort to navigate a sober life.</p>
        <img src="/images/user3.png" alt="User 2" className="user-image" />
        <p className="users-description">This series of posts shows how the road to becoming sober is not a straight path, and temptations will occur. In this individual's situation, they are on the road to a better life and situation and are almost there.</p>
      </div>
  );
}

export default Users;