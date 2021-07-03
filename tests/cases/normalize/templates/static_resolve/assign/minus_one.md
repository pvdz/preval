# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Assign > Minus one
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${-1}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `` + $coerce(-1, `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(-1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output

`````js filename=intro
$(`-1`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
