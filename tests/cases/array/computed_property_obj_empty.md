# Preval test case

# computed_property_obj_empty.md

> Array > Computed property obj empty
>
> An array with primitives that is a computed property should be converted to a string

#TODO

## Input

`````js filename=intro
const x = {'': 'pass'};
$(x[[]]);
`````

## Pre Normal

`````js filename=intro
const x = { '': `pass` };
$(x[[]]);
`````

## Normalized

`````js filename=intro
const x = { '': `pass` };
const tmpCallCallee = $;
const tmpCompObj = x;
const tmpCompProp = [];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = { '': `pass` };
const tmpCalleeParam = x[``];
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
