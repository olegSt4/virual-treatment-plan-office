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
Dear <b>${doctorFullName}</b>,

<p style="margin-top: 20px">
    Based on state parameters of patient ${patientFullName} we detected some suspicious conditions that may be danger for him/her! <br/>
    Please, see the information below and see the current treatment plan to figure out next actions.
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
    Patient phone: ${patientPhone} <br/>
</#if>
<#if doctorMail??>
    Patient mail: ${patientMail} <br/>
</#if>
<#if currentPlanLink??>
    Check current plan <a href="${currentPlanLink}">here</a><br/>
</#if>
<#if patientCardLink??>
    Check patient EMC <a href="${patientCardLink}">here</a><br/>
</#if>

<p>
    Best regards,<br/>
    System team
</p>
</body>
</html>
