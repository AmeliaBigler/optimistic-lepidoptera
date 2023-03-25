const deleteArticleHandler = async (element) => {
  
  const article_id = element.getAttribute('id');

  if (article_id) {
    const response = await fetch(`/api/article/${article_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete');
    }
  }
};

var deleteBtns = document.querySelectorAll('.delete');

deleteBtns.forEach(function(element) {
element.addEventListener("click", () => {
    deleteArticleHandler(element);
})
});