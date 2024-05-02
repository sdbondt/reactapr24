// Function to extract and return a user-friendly error message from an error object.
const displayError = (error: any): string => {
    if ('data' in error) {
      return error.data.message;
    }
    return "An error occurred";
}
  
export default displayError