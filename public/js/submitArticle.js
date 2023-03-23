const articleFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#article-title').value.trim();
    const article_body = document.querySelector('#article-body').value.trim();
    const author_id = document.querySelector('.author').getAttribute('id');
  
    if (title && article_body && author_id) {
      const response = await fetch('/api/article', {
        method: 'POST',
        body: JSON.stringify({ title, author_id, article_body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to publish');
      }
    }
};
  
document.querySelector('.article-form').addEventListener('submit', articleFormHandler);