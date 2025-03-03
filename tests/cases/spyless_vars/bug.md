# Preval test case

# bug.md

> Spyless vars > Bug
>
> 

## Input

`````js filename=intro
let a = 1; const arr = [a]; a = 2; if ($) $(arr);
`````

## Pre Normal


`````js filename=intro
let a = 1;
const arr = [a];
a = 2;
if ($) $(arr);
`````

## Normalized


`````js filename=intro
let a = 1;
const arr = [a];
a = 2;
if ($) {
  $(arr);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  const arr /*:array*/ = [1];
  $(arr);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = [ 1 ];
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
