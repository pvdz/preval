# Preval test case

# string.md

> Normalize > Templates > Static resolve > Var decl > String
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${"why"}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + String(`why`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `why`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
$(`why`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'why'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
