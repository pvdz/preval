# Preval test case

# arr_numbers.md

> Array > Arr numbers
>
> Serializing an array with elided positions

#TODO

## Input

`````js filename=intro
const tmpBinBothRhs = [1, , 3];
const tmpBinLhs = '' + tmpBinBothRhs;
$(tmpBinLhs);
`````

## Pre Normal

`````js filename=intro
const tmpBinBothRhs = [1, , 3];
const tmpBinLhs = `` + tmpBinBothRhs;
$(tmpBinLhs);
`````

## Normalized

`````js filename=intro
const tmpBinBothRhs = [1, , 3];
const tmpBinLhs = $coerce(tmpBinBothRhs, `plustr`);
$(tmpBinLhs);
`````

## Output

`````js filename=intro
$(`1,,3`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
