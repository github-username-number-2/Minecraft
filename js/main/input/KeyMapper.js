const ActiveKeys = {};

body.addEventListener("keydown", e => ActiveKeys[e.code] = true);

body.addEventListener("keyup", e => ActiveKeys[e.code] = false);

body.addEventListener("mousedown", e => ActiveKeys[["LeftMouse", "RightMouse"][e.button / 2]] = true);

body.addEventListener("mouseup", e => {
  ActiveKeys["LeftMouse"] = false;
  ActiveKeys["RightMouse"] = false;
});

export default ActiveKeys;