# Preval test case

# implicit_global_breakage.md

> Tests > Tofix > Implicit global breakage
>
> The implicit global breaks the code here but our transform
> still allows it to read $(2) before doing so. That shouldn't happen.

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
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(2);
  $1;
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 2 );
  $1;
}
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
