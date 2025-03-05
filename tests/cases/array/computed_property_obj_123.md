# Preval test case

# computed_property_obj_123.md

> Array > Computed property obj 123
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = {'1,2,3': 'pass'};
$(x[[1, 2, 3]]);
`````

## Pre Normal


`````js filename=intro
const x = { [`1,2,3`]: `pass` };
$(x[[1, 2, 3]]);
`````

## Normalized


`````js filename=intro
const x = { [`1,2,3`]: `pass` };
const tmpCompObj = x;
const tmpCompProp = [1, 2, 3];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x /*:object*/ = { [`1,2,3`]: `pass` };
const tmpCalleeParam /*:unknown*/ = x[`1,2,3`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ "1,2,3" ]: "pass" };
const b = a[ "1,2,3" ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
