# Preval test case

# base.md

> If hoisting > Base
>
> Trivial case

## Input

`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 1;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 1;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 1;
}
$(x);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
