# Preval test case

# array_in_array_holes.md

> Array > Spread > Array in array holes
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
const x = [1, ,,,2, 3];
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal


`````js filename=intro
const x = [1, , , , 2, 3];
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized


`````js filename=intro
const x = [1, , , , 2, 3];
const y = [`a`, ...x, `b`];
$(y);
`````

## Output


`````js filename=intro
const y = [`a`, 1, undefined, undefined, undefined, 2, 3, `b`];
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", 1, undefined, undefined, undefined, 2, 3, "b" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 1, undefined, undefined, undefined, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
