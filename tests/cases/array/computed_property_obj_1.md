# Preval test case

# computed_property_obj_1.md

> Array > Computed property obj 1
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = {1: 'pass'};
$(x[[1]]);
`````

## Pre Normal


`````js filename=intro
const x = { [1]: `pass` };
$(x[[1]]);
`````

## Normalized


`````js filename=intro
const x = { [1]: `pass` };
const tmpCallCallee = $;
const tmpCompObj = x;
const tmpCompProp = [1];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = { [1]: `pass` };
const tmpCalleeParam = x[`1`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { 1[ "pass" ]: "pass" };
const b = a[ "1" ];
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
