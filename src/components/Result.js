import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

function Result(props){
    const { resultData } = props;

    return(
        <StyledCardContainer>
            <Card>
                <CardActionArea>
                    {
                        resultData.image_url ?
                        <CardMedia 
                            component="img"
                            src={`${resultData.image_url}`}
                            alt="lot image"
                            style={{ maxWidth: 400 }}
                        /> :
                        null
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Parking lot name: { resultData.alias.replace(/-/g, " ") }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left"}}>
                            <b>Address:</b> <br />
                            {
                                resultData.location.display_address.map((line, index) =>
                                <span>{line}<br /></span>
                                )
                            }
                            <b>Rating:</b> {resultData.rating}
                            <br />
                            <b>Review Count:</b> {resultData.review_count}
                            <br />
                            <b><a href={resultData.url} target="_blank" style={{ textDecoration: "none" }}>Yelp Page</a></b>
                            <br />
                            <b>Rating adjusted for number of reviews:</b> {(resultData.rating * resultData.review_count) / (resultData.review_count + 1)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </StyledCardContainer>
    )
}

export default Result;

const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
        width: 80%;
        display:block;
        margin:auto;
        padding-top: 5%;
    }
`;