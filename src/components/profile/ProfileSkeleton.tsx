import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { Wrapper, Row } from './styled';

const ProfileSkeleton = () => (
    <Wrapper>
        <Row>
            <Skeleton variant="rect" width={223} height={56} />
            <Skeleton variant="rect" width={223} height={56} />
            <Skeleton variant="rect" width={223} height={56} />
        </Row>
        <Row>
            <Skeleton variant="rect" width={223} height={56} />
            <Skeleton variant="rect" width={223} height={56} />
            <Skeleton variant="rect" width={223} height={56} />
        </Row>
        <Row>
            <Skeleton variant="rect" width={223} height={56} />
        </Row>
        <Row>
            <Skeleton variant="rect" width={65} height={26} />
        </Row>
    </Wrapper>
);

export default ProfileSkeleton;
