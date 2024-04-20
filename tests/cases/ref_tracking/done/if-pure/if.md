# Preval test case

# if.md

> Ref tracking > Done > If-pure > If
>
> base

#TODO

## Input

`````js filename=intro
// before  if   else   after
// -, w, wr
// -, r, rw, w, wr, rwr, wrw
// -, r, rw, w, wr, rwr, wrw
// -, r, w

{
  let x = 1;
  if ($) {
    $(x, 2);
  } else {
  $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
    $(x, 2);
  } else {
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
  } else {
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
    $(x, 2);
    x = 10;
    $(x);
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
  } else {
    $(x, 2);
    x = 10;
    $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
    $(x, 2);
    x = 10;
    $(x, 3);
  } else {
    $(x, 4);
    x = 10;
    $(x, 5);
  }
  x = 4;
  $(x);
}
`````

## Pre Normal

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x, 2);
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}
{
  let x$1 = 1;
  if ($) {
    $(x$1, 2);
  } else {
  }
  x$1 = 4;
  $(x$1);
}
{
  let x$3 = 1;
  if ($) {
  } else {
    $(x$3, 3);
  }
  x$3 = 4;
  $(x$3);
}
{
  let x$5 = 1;
  if ($) {
  } else {
  }
  x$5 = 4;
  $(x$5);
}
{
  let x$7 = 1;
  if ($) {
    $(x$7, 2);
    x$7 = 10;
    $(x$7);
  } else {
    $(x$7, 3);
  }
  x$7 = 4;
  $(x$7);
}
{
  let x$9 = 1;
  if ($) {
  } else {
    $(x$9, 2);
    x$9 = 10;
    $(x$9, 3);
  }
  x$9 = 4;
  $(x$9);
}
{
  let x$11 = 1;
  if ($) {
    $(x$11, 2);
    x$11 = 10;
    $(x$11, 3);
  } else {
    $(x$11, 4);
    x$11 = 10;
    $(x$11, 5);
  }
  x$11 = 4;
  $(x$11);
}
`````

## Normalized

`````js filename=intro
let x = 1;
if ($) {
  $(x, 2);
} else {
  $(x, 3);
}
x = 4;
$(x);
let x$1 = 1;
if ($) {
  $(x$1, 2);
} else {
}
x$1 = 4;
$(x$1);
let x$3 = 1;
if ($) {
} else {
  $(x$3, 3);
}
x$3 = 4;
$(x$3);
let x$5 = 1;
x$5 = 4;
$(x$5);
let x$7 = 1;
if ($) {
  $(x$7, 2);
  x$7 = 10;
  $(x$7);
} else {
  $(x$7, 3);
}
x$7 = 4;
$(x$7);
let x$9 = 1;
if ($) {
} else {
  $(x$9, 2);
  x$9 = 10;
  $(x$9, 3);
}
x$9 = 4;
$(x$9);
let x$11 = 1;
if ($) {
  $(x$11, 2);
  x$11 = 10;
  $(x$11, 3);
} else {
  $(x$11, 4);
  x$11 = 10;
  $(x$11, 5);
}
x$11 = 4;
$(x$11);
`````

## Output

`````js filename=intro
if ($) {
  $(1, 2);
} else {
  $(1, 3);
}
$(4);
if ($) {
  $(1, 2);
} else {
}
$(4);
if ($) {
} else {
  $(1, 3);
}
$(4);
$(4);
if ($) {
  $(1, 2);
  $(10);
} else {
  $(1, 3);
}
$(4);
if ($) {
} else {
  $(1, 2);
  $(10, 3);
}
$(4);
if ($) {
  $(1, 2);
  $(10, 3);
} else {
  $(1, 4);
  $(10, 5);
}
$(4);
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1, 2 );
}
else {
  $( 1, 3 );
}
$( 4 );
if ($) {
  $( 1, 2 );
}
$( 4 );
if ($) {

}
else {
  $( 1, 3 );
}
$( 4 );
$( 4 );
if ($) {
  $( 1, 2 );
  $( 10 );
}
else {
  $( 1, 3 );
}
$( 4 );
if ($) {

}
else {
  $( 1, 2 );
  $( 10, 3 );
}
$( 4 );
if ($) {
  $( 1, 2 );
  $( 10, 3 );
}
else {
  $( 1, 4 );
  $( 10, 5 );
}
$( 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - 2: 4
 - 3: 1, 2
 - 4: 4
 - 5: 4
 - 6: 4
 - 7: 1, 2
 - 8: 10
 - 9: 4
 - 10: 4
 - 11: 1, 2
 - 12: 10, 3
 - 13: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
