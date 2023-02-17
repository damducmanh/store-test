import { useCallback, useEffect, useState } from 'react';

// ** Helper Imports
import { getAssessmentInCookie, setAssessmentToCookie } from './utils/cookieStorage';

// ** Constant Imports
import { FUNNY_STATUS } from './constants/common';
import { Main, BannerSection, HomeContainer, StoriesSection } from './home-styled';
import { actionStory, bannerContent, mockStories, warningEmptyStory } from './mock/data';

// ** Style Imports
import GlobalStyle from './global-styles';

// ** Image Imports
import Footer from './components/shares/Footer';
import Headers from './components/shares/Headers';

function App() {
  const [stories, setStories] = useState([]);

  const updateAssessment = useCallback((data) => {
    setStories(mockStories.filter((story) => !data.find((e) => e.id === story.id)));
  }, []);

  useEffect(() => {
    updateAssessment(getAssessmentInCookie());
  }, [updateAssessment]);

  const handleAssessmentStory = (storyId, isFunny) => {
    const assessmentsInCookie = getAssessmentInCookie() || [];
    const assessmentsUpdate = [...assessmentsInCookie, { id: storyId, isFunny }];
    updateAssessment(assessmentsUpdate);
    setAssessmentToCookie(assessmentsUpdate);
  };

  const renderStories = useCallback(() => {
    const storyFirst = (stories || [])[0];
    if (storyFirst) {
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: storyFirst.story }} />
          <div className="actions">
            <button onClick={() => handleAssessmentStory(storyFirst.id, FUNNY_STATUS.FUNNY)}>
              {actionStory.likeStory}
            </button>
            <button onClick={() => handleAssessmentStory(storyFirst.id, FUNNY_STATUS.NOT_FUNNY)}>
              {actionStory.dislikeStory}
            </button>
          </div>
        </>
      );
    }
    return warningEmptyStory;
  }, [stories]);

  return (
    <HomeContainer>
      <GlobalStyle />
      <Headers />
      <Main>
        <BannerSection>
          <div className="title">
            <h2 dangerouslySetInnerHTML={{ __html: bannerContent.title }} />
            <p dangerouslySetInnerHTML={{ __html: bannerContent.description }} />
          </div>
        </BannerSection>
        <StoriesSection className="container">
          <div className="stories">{renderStories()}</div>
        </StoriesSection>
      </Main>
      <Footer />
    </HomeContainer>
  );
}

export default App;
