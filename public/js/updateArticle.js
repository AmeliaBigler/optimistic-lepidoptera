const updateArticleFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#article-title').value.trim();
  const article_body = document.querySelector('#article-body').value;
  const article_id = document.querySelector('.updateID').getAttribute('id');

  if (title && article_body) {
    const response = await fetch(`/api/article/${article_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, article_body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update');
    }
  }
};

document.querySelector('.article-form').addEventListener('submit', updateArticleFormHandler);