<?php
$errors = array(); // array to hold validation errors
$data = array(); // array to pass back data
$name = test_input($_POST["name"]);
$email = test_input($_POST["email"]);
$message = test_input($_POST["message"]);
$exam = ($_POST["exam"]);


// validate the variables ======================================================

if (empty($name) || !preg_match("/^[a-zA-Z ]*$/", $name)) {
    $errors['name'] = 'A valid name is required.';
};

if (empty($email) || !preg_match('/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+' . '(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/i', strtolower($email)) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'A valid email address is required.';
};


if (empty($message)) {
    $errors['message'] = 'A message is required. Say hello!';
} else {
    $message = filter_var($message, FILTER_SANITIZE_SPECIAL_CHARS);
}

if (!empty($exam) && !($exam == "4" || $exam == "four")) {
    $errors['exam'] = "Sorry, you failed the canned, pre-cooked meat test.";
};


// return a response ===========================================================
// response if there are errors
if (! empty($errors)) {
  // if there are items in our errors array, return those errors
    $data['success'] = false;
    $data['errors'] = $errors;
    $data['formError'] = 'Please check the fields above.';
    echo json_encode($data);
    exit ();

} else {
  // if there are no errors, return a message
    $data['success'] = true;
    $data['formSuccess'] = 'Message sent! Thanks for contacting us. We will get back to you soon.';
  // CHANGE THE TWO LINES BELOW
    $email_to = "jory@globalbrandworks.com";
    $email_subject = "New Business Lead! Message from GBW website";
    $email_message = "Form details below.\n\n";
    $email_message .= "Name: ".$name."\n";
    $email_message .= "Email: ".$email."\n\n";
    $email_message .= "Message: ".$message."\n";
    $headers = 'From: '.$email."\r\n".
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
}
// return all our data to an AJAX call
echo json_encode($data);
exit ();

function test_input($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
};
