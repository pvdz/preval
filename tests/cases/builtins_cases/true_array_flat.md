# Preval test case

# true_array_flat.md

> Builtins cases > True array flat
>
>

## Input

`````js filename=intro
$(true + [].flat);
`````

## Pre Normal


`````js filename=intro
$(true + [].flat);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = true;
const tmpCompObj = [];
const tmpBinBothRhs = tmpCompObj.flat;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`truefunction flat() { [native code] }`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "truefunction flat() { [native code] }" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'truefunction() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
