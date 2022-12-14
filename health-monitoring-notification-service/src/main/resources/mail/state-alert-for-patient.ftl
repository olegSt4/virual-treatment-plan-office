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
    Based on yours state parameters we detected some suspicious conditions that may be danger for you! <br/>
    Please, see the information below and contact your doctor as soon as possible or ask for help to the nearest medical place.
</p>

<p>Information: </p>
Type: <#if type??>
    ${type}
</#if> <br/>
Description: <#if description??>
    ${description}
</#if> <br/>
Contacts: <br/>
<#if doctorPhone??>
    Doctor phone: ${doctorPhone} <br/>
</#if>
<#if doctorMail??>
    Doctor mail: ${doctorMail} <br/>
</#if>

<p>
    Best regards,<br/>
    System team
</p>
</body>
</html>
