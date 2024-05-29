# Preval test case

# implicit_global_breakage.md

> Tofix > Implicit global breakage
>
> The implicit global breaks the code here but our transform
> still allows it to read $(2) before doing so. That shouldn't happen.

#TODO

## Input

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  if ($1) {
    $(x);
  } else {
    $(x);
    x = 3;
  }
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  if ($1) {
    $(x);
  } else {
    $(x);
    x = 3;
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  if ($1) {
    $(x);
  } else {
    $(x);
    x = 3;
  }
}
$(x);
`````

## Output

`````js filename=intro
$(2);
$1;
$(2);
$1;
$(2);
$1;
$(2);
$1;
$(2);
$1;
$(2);
$1;
$(2);
$1;
$(2);
$1;
$(2);
$1;
$(2);
$1;
let tmpSSA_x$1 = 2;
$(2);
if ($1) {
} else {
  tmpSSA_x$1 = 3;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  tmpSSA_x$1 = 2;
  $(2);
  if ($1) {
  } else {
    tmpSSA_x$1 = 3;
  }
}
$(tmpSSA_x$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
$( 2 );
$1;
let a = 2;
$( 2 );
if ($1) {

}
else {
  a = 3;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = 2;
  $( 2 );
  if ($1) {

  }
  else {
    a = 3;
  }
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: 2
 - eval returned: ('<crash[ <ref> is not defined ]>')
