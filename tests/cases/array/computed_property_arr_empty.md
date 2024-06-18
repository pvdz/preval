# Preval test case

# computed_property_arr_empty.md

> Array > Computed property arr empty
>
> An array with primitives that is a computed property should be converted to a string

## Input

`````js filename=intro
const x = [];
$(x[[]]);
`````

## Pre Normal


`````js filename=intro
const x = [];
$(x[[]]);
`````

## Normalized


`````js filename=intro
const x = [];
const tmpCallCallee = $;
const tmpCompObj = x;
const tmpCompProp = [];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
