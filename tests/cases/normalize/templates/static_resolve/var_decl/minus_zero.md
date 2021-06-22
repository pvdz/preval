# Preval test case

# minus_zero.md

> Normalize > Templates > Static resolve > Var decl > Minus zero
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${-0}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + String(-0) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `0`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
$(`0`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
