import React from 'react';
import HeaderImage from './HeaderImage';

import Container from './Container';
import H1 from './H1';
import Wrapper from './wrapper';

function PersonalHeader({username}) {
    return (
        <Container>
            <Wrapper>
                {<HeaderImage/>}
                <H1 style={{color: 'rgb(113, 93, 236)'}}>{username}</H1>
            </Wrapper>
        </Container>
    );
}

export default PersonalHeader;