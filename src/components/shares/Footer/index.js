import React from 'react';
import { footerContent } from '../../../mock/data';
import { FooterStyled } from '../../../home-styled';

const Footer = () => {
  return (
    <FooterStyled className="container">
      <div className="footer-content">
        <p dangerouslySetInnerHTML={{ __html: footerContent.intro }} />
      </div>
      <div className="copy-right">{footerContent.copyRight}</div>
    </FooterStyled>
  );
};

export default React.memo(Footer);
