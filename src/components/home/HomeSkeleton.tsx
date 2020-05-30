import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { Wrapper, Grid } from './styled';

const HomeSkeleton = () => (
    <Wrapper>
        <Skeleton
            variant="circle"
            width={38}
            height={38}
            style={{ margin: '10px' }}
        />
        <Grid>
            <Skeleton
                variant="rect"
                width={310}
                height={101}
                style={{ gridArea: 'totalv' }}
            />
            <Skeleton
                variant="rect"
                width={310}
                height={101}
                style={{ gridArea: 'ft' }}
            />
            <Skeleton
                variant="rect"
                width={310}
                height={101}
                style={{ gridArea: 'lt' }}
            />
            <Skeleton
                variant="rect"
                width={310}
                height={101}
                style={{ gridArea: 'totalt' }}
            />
            <Skeleton
                variant="rect"
                width={310}
                height={319}
                style={{ gridArea: 'circle' }}
            />
            <Skeleton
                variant="rect"
                width={640}
                height={319}
                style={{ gridArea: 'table' }}
            />
            <Skeleton
                variant="rect"
                width={640}
                height={469}
                style={{ gridArea: 'balance' }}
            />
            <Skeleton
                variant="rect"
                width={640}
                height={469}
                style={{ gridArea: 'permonth' }}
            />
        </Grid>
    </Wrapper>
);

export default HomeSkeleton;
