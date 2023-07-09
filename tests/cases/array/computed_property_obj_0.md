# Preval test case

# computed_property_obj_0.md

> Array > Computed property obj 0
>
> An array with primitives that is a computed property should be converted to a string

#TODO

## Input

`````js filename=intro
const x = {0: 'pass'};
$(x[[0]]);
`````

## Pre Normal

`````js filename=intro
const x = { [0]: `pass` };
$(x[[0]]);
`````

## Normalized

`````js filename=intro
const x = { [0]: `pass` };
const tmpCallCallee = $;
const tmpCompObj = x;
const tmpCompProp = [0];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = { [0]: `pass` };
const tmpCalleeParam = x[`0`];
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
