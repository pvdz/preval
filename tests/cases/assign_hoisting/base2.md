# Preval test case

# base2.md

> Assign hoisting > Base2
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
let x = undefined;
if ($) {
  x = $(3); // Change x
} else {
  $(x); // Observe x
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($) {
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
if ($) {
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Output


`````js filename=intro
let x = undefined;
if ($) {
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
if ($) {
  a = $( 3 );
}
else {
  $( a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
