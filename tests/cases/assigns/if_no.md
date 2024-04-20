# Preval test case

# if_no.md

> Assigns > If no
>
> One branch write

#TODO

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x);
  } else {
    $(x);
    x = 2;
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
  } else {
    $(x);
    x = 2;
  }
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = 1;
if ($) {
  $(x);
} else {
  $(x);
  x = 2;
}
$(x);
`````

## Output

`````js filename=intro
$(1);
if ($) {
  $(1);
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
if ($) {
  $( 1 );
}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
