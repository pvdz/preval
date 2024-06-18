# Preval test case

# if_both.md

> Assigns > If both
>
> Both branches write

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    x = 2;
  } else {
    x = 3;
  }
  $(x); // observes 2 or 3 but not 1
}
`````

## Pre Normal


`````js filename=intro
{
  let x = 1;
  if ($) {
    x = 2;
  } else {
    x = 3;
  }
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = 1;
if ($) {
  x = 2;
} else {
  x = 3;
}
$(x);
`````

## Output


`````js filename=intro
if ($) {
  $(2);
} else {
  $(3);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 2 );
}
else {
  $( 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
