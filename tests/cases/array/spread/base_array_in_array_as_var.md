# Preval test case

# base_array_in_array_as_var.md

> Array > Spread > Base array in array as var
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal


`````js filename=intro
const x = [1, 2, 3];
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized


`````js filename=intro
const x = [1, 2, 3];
const y = [`a`, ...x, `b`];
$(y);
`````

## Output


`````js filename=intro
const y /*:array*/ = [`a`, 1, 2, 3, `b`];
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", 1, 2, 3, "b" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
