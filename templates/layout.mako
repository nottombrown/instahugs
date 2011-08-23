# -*- coding: utf-8 -*- 
<!DOCTYPE html>  
<head>
	
  <meta charset="utf-8">                         
  <title> An ever-expanding collection of smiles </title>
  <meta name="author" content="Pylons Project">
  <link rel="shortcut icon" href="/static/favicon.ico">
  <link rel="stylesheet" href="/static/style.css">    
                                                               
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js"></script>  --> 
                                              

</head>

<body>

  % if request.session.peek_flash():
  <div id="flash">
    <% flash = request.session.pop_flash() %>
	% for message in flash:
	${message}<br>
	% endfor
  </div>
  % endif
                   
    
    ${next.body()}

  
</body> 

<script src="/static/jquery-1.5.min.js"></script>  
<script src="/static/main.js"></script>
</html>