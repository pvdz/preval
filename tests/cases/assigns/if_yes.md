# Preval test case

# if_yes.md

> Assigns > If yes
>
> One branch write

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x);
    x = 2;
  } else {
    $(x);
  }
  $(x); // observes 1 or 2
}
`````

## Pre Normal


`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x);
    x = 2;
  } else {
    $(x);
  }
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = 1;
if ($) {
  $(x);
  x = 2;
} else {
  $(x);
}
$(x);
`````

## Output


`````js filename=intro
$(1);
if ($) {
  $(2);
} else {
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
if ($) {
  $( 2 );
}
else {
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
