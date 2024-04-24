# Preval test case

# while_continue.md

> Ref tracking > While continue
>
> base

#TODO

## Input

`````js filename=intro
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
`````

## Pre Normal

`````js filename=intro
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
  let x$1 = 1;
  while ($) {
    $(x$1);
    if ($) {
      x$1 = 2;
      break;
    } else {
    }
  }
  $(x$1);
}
{
  let x$3 = 1;
  while ($) {
    $(x$3);
    if ($) {
      continue;
    } else {
      x$3 = 2;
    }
  }
  $(x$3);
}
{
  let x$5 = 1;
  while ($) {
    $(x$5);
    if ($) {
      continue;
    } else {
    }
    x$5 = 2;
  }
  $(x$5);
}
{
  let x$7 = 1;
  while ($) {
    $(x$7);
    if ($) {
      break;
    } else {
      x$7 = 2;
    }
  }
  $(x$7);
}
{
  let x$9 = 1;
  while ($) {
    $(x$9);
    x$9 = 2;
    if ($) {
      continue;
    } else {
    }
  }
  $(x$9);
}
{
  let x$11 = 1;
  while ($) {
    $(x$11);
    if ($) {
      x$11 = 2;
      break;
    } else {
    }
  }
  $(x$11);
}
{
  let x$13 = 1;
  while ($) {
    if ($(false)) {
      x$13 = 2;
      break;
    } else {
      $(x$13);
    }
    $(x$13);
  }
}
{
  let x$15 = 1;
  while ($) {
    if ($(false)) {
      x$15 = 3;
      continue;
    } else {
    }
    $(x$15);
  }
}
{
  let x$17 = 1;
  while ($) {
    if ($(false)) {
      $(x$17);
      x$17 = 5;
      continue;
    } else {
      x$17 = 4;
    }
    x$17 = 3;
  }
}
{
  let x$19 = 1;
  while ($) {
    if ($(false)) {
      $(x$19);
      continue;
    } else {
    }
    if ($) {
      $(x$19);
      x$19 = 6;
      break;
    }
    x$19 = 3;
  }
}
{
  let x$21 = 1;
  while ($) {
    if ($(false)) {
      $(x$21);
      x$21 = 5;
      break;
    } else {
      x$21 = 4;
    }
    x$21 = 3;
  }
}
{
  let x$23 = 0;
  while ($) {
    if ($(true)) {
      x$23 = 1;
    }
    $(x$23);
    x$23 = 2;
  }
}
{
  let x$25 = 1;
  while (true) {
    if ($()) x$25 = 2;
    while (true) {
      if ($()) x$25 = 3;
      x$25 = 4;
    }
    x$25 = 5;
  }
  $(x$25);
}
{
  let x$27 = 1;
  while (true) {
    if ($()) x$27 = 2;
    while (true) {
      if ($()) x$27 = 3;
    }
    x$27 = 5;
  }
  $(x$27);
}
{
  let x$29 = 1;
  while (true) {
    if ($()) x$29 = 2;
    while (true) {
      if ($()) x$29 = 3;
      break;
    }
    x$29 = 5;
    break;
  }
  $(x$29);
}
`````

## Normalized

`````js filename=intro
let x = 1;
while (true) {
  if ($) {
    $(x);
    if ($) {
      x = 2;
      continue;
    } else {
    }
  } else {
    break;
  }
}
$(x);
let x$1 = 1;
while (true) {
  if ($) {
    $(x$1);
    if ($) {
      x$1 = 2;
      break;
    } else {
    }
  } else {
    break;
  }
}
$(x$1);
let x$3 = 1;
while (true) {
  if ($) {
    $(x$3);
    if ($) {
      continue;
    } else {
      x$3 = 2;
    }
  } else {
    break;
  }
}
$(x$3);
let x$5 = 1;
while (true) {
  if ($) {
    $(x$5);
    if ($) {
      continue;
    } else {
      x$5 = 2;
    }
  } else {
    break;
  }
}
$(x$5);
let x$7 = 1;
while (true) {
  if ($) {
    $(x$7);
    if ($) {
      break;
    } else {
      x$7 = 2;
    }
  } else {
    break;
  }
}
$(x$7);
let x$9 = 1;
while (true) {
  if ($) {
    $(x$9);
    x$9 = 2;
    if ($) {
      continue;
    } else {
    }
  } else {
    break;
  }
}
$(x$9);
let x$11 = 1;
while (true) {
  if ($) {
    $(x$11);
    if ($) {
      x$11 = 2;
      break;
    } else {
    }
  } else {
    break;
  }
}
$(x$11);
let x$13 = 1;
while (true) {
  if ($) {
    const tmpIfTest = $(false);
    if (tmpIfTest) {
      x$13 = 2;
      break;
    } else {
      $(x$13);
      $(x$13);
    }
  } else {
    break;
  }
}
let x$15 = 1;
while (true) {
  if ($) {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      x$15 = 3;
      continue;
    } else {
      $(x$15);
    }
  } else {
    break;
  }
}
let x$17 = 1;
while (true) {
  if ($) {
    const tmpIfTest$3 = $(false);
    if (tmpIfTest$3) {
      $(x$17);
      x$17 = 5;
      continue;
    } else {
      x$17 = 4;
      x$17 = 3;
    }
  } else {
    break;
  }
}
let x$19 = 1;
while (true) {
  if ($) {
    const tmpIfTest$5 = $(false);
    if (tmpIfTest$5) {
      $(x$19);
      continue;
    } else {
      if ($) {
        $(x$19);
        x$19 = 6;
        break;
      } else {
        x$19 = 3;
      }
    }
  } else {
    break;
  }
}
let x$21 = 1;
while (true) {
  if ($) {
    const tmpIfTest$7 = $(false);
    if (tmpIfTest$7) {
      $(x$21);
      x$21 = 5;
      break;
    } else {
      x$21 = 4;
      x$21 = 3;
    }
  } else {
    break;
  }
}
let x$23 = 0;
while (true) {
  if ($) {
    const tmpIfTest$9 = $(true);
    if (tmpIfTest$9) {
      x$23 = 1;
    } else {
    }
    $(x$23);
    x$23 = 2;
  } else {
    break;
  }
}
let x$25 = 1;
while (true) {
  const tmpIfTest$11 = $();
  if (tmpIfTest$11) {
    x$25 = 2;
  } else {
  }
  while (true) {
    const tmpIfTest$13 = $();
    if (tmpIfTest$13) {
      x$25 = 3;
    } else {
    }
    x$25 = 4;
  }
  x$25 = 5;
}
$(x$25);
let x$27 = 1;
while (true) {
  const tmpIfTest$15 = $();
  if (tmpIfTest$15) {
    x$27 = 2;
  } else {
  }
  while (true) {
    const tmpIfTest$17 = $();
    if (tmpIfTest$17) {
      x$27 = 3;
    } else {
    }
  }
  x$27 = 5;
}
$(x$27);
let x$29 = 1;
while (true) {
  const tmpIfTest$19 = $();
  if (tmpIfTest$19) {
    x$29 = 2;
  } else {
  }
  while (true) {
    const tmpIfTest$21 = $();
    if (tmpIfTest$21) {
      x$29 = 3;
    } else {
    }
    break;
  }
  x$29 = 5;
  break;
}
$(x$29);
`````

## Output

`````js filename=intro
let x = 1;
if ($) {
  $(1);
  if ($) {
    x = 2;
    if ($) {
      while ($LOOP_UNROLL_10) {
        if ($) {
          $(x);
        } else {
          break;
        }
      }
    } else {
    }
  } else {
  }
} else {
}
$(x);
let x$1 = 1;
let $tmpLoopUnrollCheck$1 = true;
if ($) {
  $(1);
  if ($) {
    x$1 = 2;
    $tmpLoopUnrollCheck$1 = false;
  } else {
  }
} else {
  $tmpLoopUnrollCheck$1 = false;
}
if ($tmpLoopUnrollCheck$1) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $(x$1);
      if ($) {
        x$1 = 2;
        break;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
$(x$1);
let x$3 = 1;
if ($) {
  $(1);
  if ($) {
  } else {
    x$3 = 2;
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        $(x$3);
        if ($) {
        } else {
          x$3 = 2;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
$(x$3);
let x$5 = 1;
if ($) {
  $(1);
  if ($) {
  } else {
    x$5 = 2;
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        $(x$5);
        if ($) {
        } else {
          x$5 = 2;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
$(x$5);
let x$7 = 1;
let $tmpLoopUnrollCheck = true;
if ($) {
  $(1);
  if ($) {
    $tmpLoopUnrollCheck = false;
  } else {
    x$7 = 2;
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $(x$7);
      if ($) {
        break;
      } else {
        x$7 = 2;
      }
    } else {
      break;
    }
  }
} else {
}
$(x$7);
let x$9 = 1;
if ($) {
  $(1);
  x$9 = 2;
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        $(x$9);
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
$(x$9);
let x$11 = 1;
let $tmpLoopUnrollCheck$3 = true;
if ($) {
  $(1);
  if ($) {
    x$11 = 2;
    $tmpLoopUnrollCheck$3 = false;
  } else {
  }
} else {
  $tmpLoopUnrollCheck$3 = false;
}
if ($tmpLoopUnrollCheck$3) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $(x$11);
      if ($) {
        x$11 = 2;
        break;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
$(x$11);
let x$13 = 1;
let $tmpLoopUnrollCheck$2 = true;
if ($) {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x$13 = 2;
    $tmpLoopUnrollCheck$2 = false;
  } else {
    $(x$13);
    $(x$13);
  }
} else {
  $tmpLoopUnrollCheck$2 = false;
}
if ($tmpLoopUnrollCheck$2) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      const tmpIfTest$1 = $(false);
      if (tmpIfTest$1) {
        x$13 = 2;
        break;
      } else {
        $(x$13);
        $(x$13);
      }
    } else {
      break;
    }
  }
} else {
}
let x$15 = 1;
if ($) {
  const tmpIfTest$3 = $(false);
  if (tmpIfTest$3) {
    x$15 = 3;
  } else {
    $(x$15);
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        const tmpIfTest$2 = $(false);
        if (tmpIfTest$2) {
          x$15 = 3;
        } else {
          $(x$15);
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
let x$17 = 5;
if ($) {
  const tmpIfTest$5 = $(false);
  if (tmpIfTest$5) {
    $(1);
  } else {
    x$17 = 3;
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        const tmpIfTest$4 = $(false);
        if (tmpIfTest$4) {
          $(x$17);
          x$17 = 5;
        } else {
          x$17 = 4;
          x$17 = 3;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
let x$19 = 1;
let $tmpLoopUnrollCheck$4 = true;
if ($) {
  const tmpIfTest$7 = $(false);
  if (tmpIfTest$7) {
    $(1);
  } else {
    if ($) {
      $(1);
      x$19 = 6;
      $tmpLoopUnrollCheck$4 = false;
    } else {
      x$19 = 3;
    }
  }
} else {
  $tmpLoopUnrollCheck$4 = false;
}
if ($tmpLoopUnrollCheck$4) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      const tmpIfTest$6 = $(false);
      if (tmpIfTest$6) {
        $(x$19);
      } else {
        if ($) {
          $(x$19);
          x$19 = 6;
          break;
        } else {
          x$19 = 3;
        }
      }
    } else {
      break;
    }
  }
} else {
}
let x$21 = 1;
let $tmpLoopUnrollCheck$5 = true;
if ($) {
  const tmpIfTest$9 = $(false);
  if (tmpIfTest$9) {
    $(1);
    x$21 = 5;
    $tmpLoopUnrollCheck$5 = false;
  } else {
    x$21 = 3;
  }
} else {
  $tmpLoopUnrollCheck$5 = false;
}
if ($tmpLoopUnrollCheck$5) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      const tmpIfTest$8 = $(false);
      if (tmpIfTest$8) {
        $(x$21);
        x$21 = 5;
        break;
      } else {
        x$21 = 4;
        x$21 = 3;
      }
    } else {
      break;
    }
  }
} else {
}
let x$23 = 0;
if ($) {
  const tmpIfTest$11 = $(true);
  if (tmpIfTest$11) {
    x$23 = 1;
    $(1);
  } else {
    $(x$23);
  }
  x$23 = 2;
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        const tmpIfTest$10 = $(true);
        if (tmpIfTest$10) {
          x$23 = 1;
          $(1);
        } else {
          $(x$23);
        }
        x$23 = 2;
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
let x$25 = 1;
while (true) {
  const tmpIfTest$13 = $();
  if (tmpIfTest$13) {
    x$25 = 2;
  } else {
  }
  const tmpIfTest$15 = $();
  if (tmpIfTest$15) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$12 = $();
  if (tmpIfTest$12) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$14 = $();
  if (tmpIfTest$14) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$16 = $();
  if (tmpIfTest$16) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$17 = $();
  if (tmpIfTest$17) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$18 = $();
  if (tmpIfTest$18) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$19 = $();
  if (tmpIfTest$19) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$20 = $();
  if (tmpIfTest$20) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$21 = $();
  if (tmpIfTest$21) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$22 = $();
  if (tmpIfTest$22) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  const tmpIfTest$23 = $();
  if (tmpIfTest$23) {
    x$25 = 3;
  } else {
  }
  x$25 = 4;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpIfTest$24 = $();
    if (tmpIfTest$24) {
      x$25 = 3;
    } else {
    }
    x$25 = 4;
  }
  x$25 = 5;
}
$(x$25);
let x$27 = 1;
while (true) {
  const tmpIfTest$25 = $();
  if (tmpIfTest$25) {
    x$27 = 2;
  } else {
  }
  const tmpIfTest$27 = $();
  if (tmpIfTest$27) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$26 = $();
  if (tmpIfTest$26) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$28 = $();
  if (tmpIfTest$28) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$29 = $();
  if (tmpIfTest$29) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$30 = $();
  if (tmpIfTest$30) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$31 = $();
  if (tmpIfTest$31) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$32 = $();
  if (tmpIfTest$32) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$33 = $();
  if (tmpIfTest$33) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$34 = $();
  if (tmpIfTest$34) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$35 = $();
  if (tmpIfTest$35) {
    x$27 = 3;
  } else {
  }
  const tmpIfTest$36 = $();
  if (tmpIfTest$36) {
    x$27 = 3;
  } else {
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpIfTest$37 = $();
    if (tmpIfTest$37) {
      x$27 = 3;
    } else {
    }
  }
  x$27 = 5;
}
$(x$27);
$();
$();
$(5);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
if ($) {
  $( 1 );
  if ($) {
    a = 2;
    if ($) {
      while ($LOOP_UNROLL_10) {
        if ($) {
          $( a );
        }
        else {
          break;
        }
      }
    }
  }
}
$( a );
let b = 1;
let c = true;
if ($) {
  $( 1 );
  if ($) {
    b = 2;
    c = false;
  }
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $( b );
      if ($) {
        b = 2;
        break;
      }
    }
    else {
      break;
    }
  }
}
$( b );
let d = 1;
if ($) {
  $( 1 );
  if ($) {

  }
  else {
    d = 2;
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        $( d );
        if ($) {

        }
        else {
          d = 2;
        }
      }
      else {
        break;
      }
    }
  }
}
$( d );
let e = 1;
if ($) {
  $( 1 );
  if ($) {

  }
  else {
    e = 2;
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        $( e );
        if ($) {

        }
        else {
          e = 2;
        }
      }
      else {
        break;
      }
    }
  }
}
$( e );
let f = 1;
let g = true;
if ($) {
  $( 1 );
  if ($) {
    g = false;
  }
  else {
    f = 2;
  }
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $( f );
      if ($) {
        break;
      }
      else {
        f = 2;
      }
    }
    else {
      break;
    }
  }
}
$( f );
let h = 1;
if ($) {
  $( 1 );
  h = 2;
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        $( h );
      }
      else {
        break;
      }
    }
  }
}
$( h );
let i = 1;
let j = true;
if ($) {
  $( 1 );
  if ($) {
    i = 2;
    j = false;
  }
}
else {
  j = false;
}
if (j) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $( i );
      if ($) {
        i = 2;
        break;
      }
    }
    else {
      break;
    }
  }
}
$( i );
let k = 1;
let l = true;
if ($) {
  const m = $( false );
  if (m) {
    k = 2;
    l = false;
  }
  else {
    $( k );
    $( k );
  }
}
else {
  l = false;
}
if (l) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      const n = $( false );
      if (n) {
        k = 2;
        break;
      }
      else {
        $( k );
        $( k );
      }
    }
    else {
      break;
    }
  }
}
let o = 1;
if ($) {
  const p = $( false );
  if (p) {
    o = 3;
  }
  else {
    $( o );
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        const q = $( false );
        if (q) {
          o = 3;
        }
        else {
          $( o );
        }
      }
      else {
        break;
      }
    }
  }
}
let r = 5;
if ($) {
  const s = $( false );
  if (s) {
    $( 1 );
  }
  else {
    r = 3;
  }
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        const t = $( false );
        if (t) {
          $( r );
          r = 5;
        }
        else {
          r = 4;
          r = 3;
        }
      }
      else {
        break;
      }
    }
  }
}
let u = 1;
let v = true;
if ($) {
  const w = $( false );
  if (w) {
    $( 1 );
  }
  else {
    if ($) {
      $( 1 );
      u = 6;
      v = false;
    }
    else {
      u = 3;
    }
  }
}
else {
  v = false;
}
if (v) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      const x = $( false );
      if (x) {
        $( u );
      }
      else {
        if ($) {
          $( u );
          u = 6;
          break;
        }
        else {
          u = 3;
        }
      }
    }
    else {
      break;
    }
  }
}
let y = 1;
let z = true;
if ($) {
  const 01 = $( false );
  if (01) {
    $( 1 );
    y = 5;
    z = false;
  }
  else {
    y = 3;
  }
}
else {
  z = false;
}
if (z) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      const 11 = $( false );
      if (11) {
        $( y );
        y = 5;
        break;
      }
      else {
        y = 4;
        y = 3;
      }
    }
    else {
      break;
    }
  }
}
let 21 = 0;
if ($) {
  const 31 = $( true );
  if (31) {
    21 = 1;
    $( 1 );
  }
  else {
    $( 21 );
  }
  21 = 2;
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        const 41 = $( true );
        if (41) {
          21 = 1;
          $( 1 );
        }
        else {
          $( 21 );
        }
        21 = 2;
      }
      else {
        break;
      }
    }
  }
}
let 51 = 1;
while (true) {
  const 61 = $();
  if (61) {
    51 = 2;
  }
  const 71 = $();
  if (71) {
    51 = 3;
  }
  51 = 4;
  const 81 = $();
  if (81) {
    51 = 3;
  }
  51 = 4;
  const 91 = $();
  if (91) {
    51 = 3;
  }
  51 = 4;
  const a1 = $();
  if (a1) {
    51 = 3;
  }
  51 = 4;
  const b1 = $();
  if (b1) {
    51 = 3;
  }
  51 = 4;
  const c1 = $();
  if (c1) {
    51 = 3;
  }
  51 = 4;
  const d1 = $();
  if (d1) {
    51 = 3;
  }
  51 = 4;
  const e1 = $();
  if (e1) {
    51 = 3;
  }
  51 = 4;
  const f1 = $();
  if (f1) {
    51 = 3;
  }
  51 = 4;
  const g1 = $();
  if (g1) {
    51 = 3;
  }
  51 = 4;
  const h1 = $();
  if (h1) {
    51 = 3;
  }
  51 = 4;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const i1 = $();
    if (i1) {
      51 = 3;
    }
    51 = 4;
  }
  51 = 5;
}
$( 51 );
let j1 = 1;
while (true) {
  const k1 = $();
  if (k1) {
    j1 = 2;
  }
  const l1 = $();
  if (l1) {
    j1 = 3;
  }
  const m1 = $();
  if (m1) {
    j1 = 3;
  }
  const n1 = $();
  if (n1) {
    j1 = 3;
  }
  const o1 = $();
  if (o1) {
    j1 = 3;
  }
  const p1 = $();
  if (p1) {
    j1 = 3;
  }
  const q1 = $();
  if (q1) {
    j1 = 3;
  }
  const r1 = $();
  if (r1) {
    j1 = 3;
  }
  const s1 = $();
  if (s1) {
    j1 = 3;
  }
  const t1 = $();
  if (t1) {
    j1 = 3;
  }
  const u1 = $();
  if (u1) {
    j1 = 3;
  }
  const v1 = $();
  if (v1) {
    j1 = 3;
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const w1 = $();
    if (w1) {
      j1 = 3;
    }
  }
  j1 = 5;
}
$( j1 );
$();
$();
$( 5 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
