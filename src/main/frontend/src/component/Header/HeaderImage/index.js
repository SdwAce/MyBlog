import React from 'react';

import Wrapper from './Wrapper';
import imgSrc from '../../../Image/blog.jpg';

function HeaderImage() {
    return (
        <Wrapper>
            <img src={imgSrc} alt="" />
        </Wrapper>
    );
}

export default HeaderImage;