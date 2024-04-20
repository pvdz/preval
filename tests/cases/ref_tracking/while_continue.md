// base

{
  let x = 1;
  while ($) {
    $(x);
    if ($) {
      x = 2;
      continue;
    } else {
    }
  }
  $(x);
}  

{
  let x = 1;
  while ($) {
    $(x);
    if ($) {
      x = 2;
      break;
    } else {
    }
  }
  $(x);
}

{
  let x = 1;
  while ($) {
    $(x);
    if ($) {
      continue;
    } else {
      x = 2;
    }
  }
  $(x);
}  

{
  let x = 1;
  while ($) {
    $(x);
    if ($) {
      continue;
    } else {
    }
    x = 2;
  }
  $(x);
}  
  
{
  let x = 1;
  while ($) {
    $(x);
    if ($) {
      break;
    } else {
      x = 2;
    }
  }
  $(x);
}  

{
  let x = 1;
  while ($) {
    $(x);
    x = 2;
    if ($) {
      continue;
    } else {
    }
  }
  $(x);
}

{
  let x = 1;
  while ($) {
    $(x);
    if ($) {
      x = 2;
      break;
    } else {
    }
  }
  $(x);
}  

{
  let x = 1;
  while ($) {
    if ($(false)) {
      x = 2
      break;
    } else {
      $(x);
    }
    $(x);
  }
}

{
  let x = 1;
  while ($) {
    if ($(false)) {
      x = 3;
      continue;
    } else {
    }
    $(x);
  }
}

{
  let x = 1;
  while ($) {
    if ($(false)) {
      $(x);
      x = 5;
      continue;
    } else {
      x = 4;
    }
    x = 3;
  }
}

{
  let x = 1;
  while ($) {
    if ($(false)) {
      $(x);
      continue;
    } else {
    }
    if ($) {
      $(x);
      x = 6;
      break;
    }
    x = 3;
  }
}


{
  let x = 1;
  while ($) {
    if ($(false)) {
      $(x);
      x = 5;
      break;
    } else {
      x = 4;
    }
    x = 3;
  }
}

{
  let x = 0;
  while ($) {
    if ($(true)) {
      x = 1;
    }
    $(x);
    x = 2;
  }
}

{
  let x = 1;
  while (true) {
    if ($()) x = 2;
    while (true) {
      if ($()) x = 3;
      x = 4;
    }
    x = 5;
  }
  $(x);
}

{
  let x = 1;
  while (true) {
    if ($()) x = 2;
    while (true) {
      if ($()) x = 3; // May overwrite x=5
    }
    x = 5;
  }
  $(x);
}

{
  let x = 1;
  while (true) {
    if ($()) x = 2;
    while (true) {
      if ($()) x = 3; // May overwrite x=5
      break;
    }
    x = 5;
    break;
  }
  $(x);
}
