# Preval test case

# computed_property_obj_123.md

> Array > Computed property obj 123
>
> An array with primitives that is a computed property should be converted to a string

#TODO

## Input

`````js filename=intro
const x = {'1,2,3': 'pass'};
$(x[[1, 2, 3]]);
`````

## Pre Normal

`````js filename=intro
const x = { '1,2,3': `pass` };
$(x[[1, 2, 3]]);
`````

## Normalized

`````js filename=intro
const x = { '1,2,3': `pass` };
const tmpCallCallee = $;
const tmpCompObj = x;
const tmpCompProp = [1, 2, 3];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = { '1,2,3': `pass` };
const tmpCalleeParam = x[`1,2,3`];
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