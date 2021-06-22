# Preval test case

# null.md

> Normalize > Templates > Static resolve > Var decl > Null
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${null}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + String(null) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `null`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
$(`null`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'null'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
