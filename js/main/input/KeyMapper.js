window.ActiveKeys = {};

body.addEventListener("keydown", e => {
  ActiveKeys[e.code] = true;
});

body.addEventListener("keyup", e => {
  ActiveKeys[e.code] = false;
});

body.addEventListener("mousedown", e => {
  ActiveKeys["Mouse"] = true;
});

body.addEventListener("mouseup", e => {
  ActiveKeys["Mouse"] = false;
});