# Preval test case

# coerce_array_flat_symbol.md

> Builtins cases > Coerce array flat symbol
>
>

## Input

`````js filename=intro
const x = $coerce($array_flat, 'plustr')
$(x);
`````

## Pre Normal


`````js filename=intro
const x = $coerce($array_flat, `plustr`);
$(x);
`````

## Normalized


`````js filename=intro
const x = $coerce($array_flat, `plustr`);
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
