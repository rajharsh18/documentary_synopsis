$(document).ready(function() {

    $('#search_button').click(async function() {
        var key = $('#search_text').val();
        var tableData = {
            'query': key
        };
        try {
            var status = await send_data(tableData);
        } catch (error) {
            console.log(error);
        }
    });


    // AJAX request to send the keywords to index.html
    async function send_data(data) {
        return new Promise(async function(resolve, reject) {
            $.ajax({
                url: '/send_data',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: async function(response){
                    await $('#parent_div').empty();
                    await addArrivalSection1(response);
                    // console.log(response);
                    
                    resolve(response);
                },
                error: function(error) {
                    console.log('AJAX Error:', error);
                    reject(error);
                }
            });
        });
    }
    
    async function addArrivalSection1(list) {
        const keysArray = Object.keys(list);
        const len = keysArray.length;
        console.log(len);
        for (var i = 0; i < len; i++) {
            console.log(i);
            // Create the necessary HTML elements
            const arrivalSection = document.createElement('div');
            arrivalSection.className = 'arrival_section layout_padding';
            
            const container = document.createElement('div');
            container.className = 'container';
            
            const row = document.createElement('div');
            row.className = 'row';
            
            const colMd8 = document.createElement('div');
            colMd8.className = 'col-md-4';
            
            const link = document.createElement('a');
            link.href = list[i]['links'];
            link.target = '_blank';
            
            const image = document.createElement('img');
            image.src = list[i]['image_links'];
            image.alt = 'Thumbnail';
            image.width = '250'
            
            const colMd4 = document.createElement('div');
            colMd4.className = 'col-md-8';
            
            const movieDetails = document.createElement('div');
            movieDetails.className = 'movie_details';
            
            const title = document.createElement('h1');
            title.className = 'arrival_text';
            title.textContent = list[i]['titles'];
            
            const textBox = document.createElement('div');
            textBox.className = 'text_box';
            
            const longText = document.createElement('p');
            longText.className = 'long_text';
            const longTextContent = list[i]['synopsis'];
            longText.textContent = longTextContent;
            
            // Append elements to build the structure
            link.appendChild(image);
            colMd8.appendChild(link);
            movieDetails.appendChild(title);
            movieDetails.appendChild(textBox);
            textBox.appendChild(longText);
            colMd4.appendChild(movieDetails);
            row.appendChild(colMd8);
            row.appendChild(colMd4);
            container.appendChild(row);
            arrivalSection.appendChild(container);
            
            const parentElement = document.querySelector('#parent_div');
            parentElement.appendChild(arrivalSection);
        }
     }

});