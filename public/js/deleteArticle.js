const deleteArticleHandler = async (event) => {
    event.preventDefault();
  
    const article_id = document.querySelector('.articleTitle').getAttribute('id');
  
    if (article_id) {
      const response = await fetch(`/api/article/${article_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
        console.log()
      } else {
        alert('Failed to delete');
      }
    }
};
  
document.querySelector('#delete').addEventListener('click', deleteArticleHandler);