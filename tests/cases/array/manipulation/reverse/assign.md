# Preval test case

# assign.md

> Array > Manipulation > Reverse > Assign
>
> Simple case

## Input

`````js filename=intro
let arr = [1, 2];
const rra = arr.reverse();
if ($) {
  arr = $
}
$(rra);
`````

## Pre Normal


`````js filename=intro
let arr = [1, 2];
const rra = arr.reverse();
if ($) {
  arr = $;
}
$(rra);
`````

## Normalized


`````js filename=intro
let arr = [1, 2];
const rra = arr.reverse();
if ($) {
  arr = $;
} else {
}
$(rra);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [2, 1];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 2, 1 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [2, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
