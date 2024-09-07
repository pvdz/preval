# Preval test case

# coerce_array_flat.md

> Builtins cases > Coerce array flat
>
>

## Input

`````js filename=intro
const method = [].flat;
const x = $coerce(method, 'plustr')
$(x);
`````

## Pre Normal


`````js filename=intro
const method = [].flat;
const x = $coerce(method, `plustr`);
$(x);
`````

## Normalized


`````js filename=intro
const tmpCompObj = [];
const method = tmpCompObj.flat;
const x = $coerce(method, `plustr`);
$(x);
`````

## Output


`````js filename=intro
$(`function flat() { [native code] }`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "function flat() { [native code] }" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
