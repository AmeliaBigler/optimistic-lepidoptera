const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector('#comment-body').value.trim();
  const commenter_id = document.querySelector('.commenter').getAttribute('id');
  const article_id = document.querySelector('.articleTitle').getAttribute('id');

  if (comment_body && commenter_id && article_id) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ article_id, commenter_id, comment_body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to publish');
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);