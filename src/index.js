import 'regenerator-runtime/runtime'
import 'bulma/css/bulma.css'
import './styles/main.scss';
import likeIcon from './like.svg';

const api_key = process.env.API_KEY; // Recupero la variabile dal .env

const container = document.getElementById('comments');

const getComments = async (videoId) => {
    let response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet,replies&maxResults=100&key=${api_key}`);
    let data = await response.json()
    return data;
}

const commentTemplate = item => {
    const { id, snippet } = item;
    const { textDisplay, authorDisplayName, authorProfileImageUrl, authorChannelUrl, likeCount, publishedAt} = snippet.topLevelComment.snippet;
    const date = new Date(publishedAt);
    let datePublished = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    console.log(datePublished);
    return `
        <div class="card" id="card-${id}">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                    <figure class="image is-48x48">
                        <img src="${authorProfileImageUrl}" alt="${authorDisplayName}">
                    </figure>
                    </div>
                    <div class="media-content">
                    <p class="title is-6"><a href="${authorChannelUrl}" target="_blank">${authorDisplayName}</a></p>
                    </div>
                </div>
                <div class="content">
                    ${textDisplay}
                </div>
                <div class="tags has-addons">
                    <time class="tag  is-primary is-light" datetime="2016-1-1">${datePublished}</time>
                    <span class="tag"><img src="${likeIcon}" class="likeIcon" />${likeCount}</span>
                </div>
            </div>
        </div>
    `;
}

const printComments = data => {
    const { items } = data;
    if(items){
        container.innerHTML = `${items.map(commentTemplate).join('')}`
    }
}

getComments('Re9PSburA-k')
    .then(data => printComments(data)); 