# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Assign > Arr holes
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${[1,,3]}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `` + $coerce([1, , 3], `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpCallCallee = [1, , 3];
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
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
