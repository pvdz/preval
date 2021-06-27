# Preval test case

# nan_plus_array_flat.md

> Property lookup > Nan plus array flat
>
> wat

#TODO

## Input

`````js filename=intro
// Resulting output after one pass [intro]
const tmpBinBothRhs$893 = $ArrayPrototype.flat;
const tmpCompObj$459 = NaN + tmpBinBothRhs$893;
$(tmpCompObj$459);
`````

## Pre Normal

`````js filename=intro
const tmpBinBothRhs$893 = $ArrayPrototype.flat;
const tmpCompObj$459 = NaN + tmpBinBothRhs$893;
$(tmpCompObj$459);
`````

## Normalized

`````js filename=intro
const tmpBinBothRhs$893 = $ArrayPrototype.flat;
const tmpCompObj$459 = NaN + tmpBinBothRhs$893;
$(tmpCompObj$459);
`````

## Output

`````js filename=intro
$ArrayPrototype.flat;
$(`NaNfunction flat() { [native code] }`);
`````

## Globals

BAD@! Found 1 implicit global bindings:

$ArrayPrototype

## Result

Should call `$` with:
 - 1: 'NaNfunction() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
