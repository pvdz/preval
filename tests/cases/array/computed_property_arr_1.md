# Preval test case

# computed_property_arr_1.md

> Array > Computed property arr 1
>
> An array with primitives that is a computed property should be converted to a string

#TODO

## Input

`````js filename=intro
const x = ['fail', 'pass'];
$(x[[1]]);
`````

## Pre Normal


`````js filename=intro
const x = [`fail`, `pass`];
$(x[[1]]);
`````

## Normalized


`````js filename=intro
const x = [`fail`, `pass`];
const tmpCallCallee = $;
const tmpCompObj = x;
const tmpCompProp = [1];
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "pass" );
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
