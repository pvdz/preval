# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Assign > Nan
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${NaN}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `` + $coerce(NaN, `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(NaN, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output

`````js filename=intro
$(`NaN`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
