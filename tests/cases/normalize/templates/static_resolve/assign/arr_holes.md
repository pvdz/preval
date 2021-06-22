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
x = `` + String([1, , 3]) + ``;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpCallCallee = String;
const tmpCalleeParam = [1, , 3];
const tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [1, , 3];
const tmpBinBothRhs = String(tmpCalleeParam);
$(tmpBinBothRhs);
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
