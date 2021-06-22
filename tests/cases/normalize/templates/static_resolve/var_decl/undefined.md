# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Var decl > Undefined
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${undefined}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + String(undefined) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `undefined`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
$(`undefined`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
