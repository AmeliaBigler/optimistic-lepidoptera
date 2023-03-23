module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },

    // sessionUserisAuthor: (user) => {
    //     if (req.session.user_id === user.id) {
    //         return true;
    //     } else {return false};
    // },
}