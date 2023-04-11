alternative frontend design

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Tahoma', sans-serif;
      background-color: teal;
      margin: 0;
      padding: 0;
    }

    .taskbar {
      display: flex;
      align-items: center;
      background: linear-gradient(to bottom, #C0C0C0 0%, #808080 100%);
      height: 30px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 1px solid #FFFFFF;
    }

    .start-button {
      display: flex;
      align-items: center;
      padding-left: 5px;
      padding-right: 5px;
      height: 100%;
      background-color: #008080;
      color: white;
      font-weight: bold;
      cursor: pointer;
      border-right: 1px solid #696969;
      border-left: 1px solid #FFFFFF;
      background: linear-gradient(to bottom, #008080 0%, #006666 100%);
      text-shadow: -1px -1px 1px #004040;
    }

    .start-button:hover {
      background: linear-gradient(to bottom, #006666 0%, #004040 100%);
    }

    .taskbar-items {
      display: flex;
      margin-left: 10px;
    }

    .taskbar-item {
      display: flex;
      align-items: center;
      padding-left: 8px;
      padding-right: 8px;
      height: 100%;
      background-color: #C0C0C0;
      border-right: 1px solid #696969;
      border-left: 1px solid #FFFFFF;
      cursor: pointer;
    }

    .taskbar-item:hover {
      background-color: #B0C4DE;
    }

  </style>
</head>
<body>
  <div class="taskbar">
    <div class="start-button">Start</div>
    <div class="taskbar-items">
      <div class="taskbar-item">Program 1</div>
      <div class="taskbar-item">Program 2</div>
      <div class="taskbar-item">Program 3</div>
    </div>
  </div>
</body>
</html>
