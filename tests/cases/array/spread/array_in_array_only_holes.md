# Preval test case

# array_in_array_only_holes.md

> Array > Spread > Array in array only holes
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
const x = [,,,];
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal


`````js filename=intro
const x = [, , ,];
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized


`````js filename=intro
const x = [, , ,];
const y = [`a`, ...x, `b`];
$(y);
`````

## Output


`````js filename=intro
const y = [`a`, undefined, undefined, undefined, `b`];
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", undefined, undefined, undefined, "b" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', undefined, undefined, undefined, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
