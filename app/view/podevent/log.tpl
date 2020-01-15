<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/log.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in podList %}
        <li class="item">
          <a>{{ item.content }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>