# Preval test case

# pop.md

> Array > Manipulation > Pop
>
> Push a number to an array

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.pop());
$(arr);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(arr.pop());
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCalleeParam = arr.pop();
$(tmpCalleeParam);
$(arr);
`````

## Output


`````js filename=intro
$(3);
const arr /*:array*/ = [1, 2];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
const a = [ 1, 2 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
