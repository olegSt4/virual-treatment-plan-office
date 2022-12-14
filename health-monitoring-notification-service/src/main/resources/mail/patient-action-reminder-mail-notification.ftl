<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    ​
    <style>
        body {
            margin: 0 10px 10px 10px;
            padding: 10px;
        }
        header {
            background-color: #050536;
            padding: 30px;
            border-radius: 10px;
        }
        ​
        p {
            margin-bottom: 20px;
        }
        ​
        .logo {
            width: 100px;
            max-width: 100px;
        }
        ​
    </style>
</head>
<body>
Dear <b>${patientFullName}</b>,

<p style="margin-top: 20px">
    This is a kindly reminder about your next action in scope of treatment plan #${planId}
</p>

<p>Data: </p>
Type: <#if type??>
    ${type}
</#if> <br/>
Description: <#if description??>
    ${description}
</#if> <br/>
Date: <#if date??>
    &emsp;${date?string}
</#if>

<p>
    Please, don't forget to mark your completed step in your plan page <a href="${planPageLink}">here</a>
</p>
<p>
    Best regards,<br/>
    System team
</p>
</body>
</html>
