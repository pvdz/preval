# Preval test case

# arr_computed_property_0.md

> Array > Arr computed property 0
>
> An array with primitives that is a computed property should be converted to a string

#TODO

## Input

`````js filename=intro
const x = ['pass'];
$(x[[0]]);
`````

## Pre Normal

`````js filename=intro
const x = [`pass`];
$(x[[0]]);
`````

## Normalized

`````js filename=intro
const x = [`pass`];
const tmpCallCallee = $;
const tmpCompObj = x;
const tmpCompProp = [0];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = [`pass`];
const tmpCompProp = [0];
const tmpCalleeParam = x[tmpCompProp];
$(tmpCalleeParam);
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
