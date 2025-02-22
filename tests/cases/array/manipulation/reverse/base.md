# Preval test case

# base.md

> Array > Manipulation > Reverse > Base
>
> Simple case

## Input

`````js filename=intro
const arr = [1, 2];
const rra = arr.reverse();
$(rra);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2];
const rra = arr.reverse();
$(rra);
`````

## Normalized


`````js filename=intro
const arr = [1, 2];
const rra = arr.reverse();
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
