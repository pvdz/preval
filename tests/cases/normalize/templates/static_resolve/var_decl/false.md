# Preval test case

# false.md

> Normalize > Templates > Static resolve > Var decl > False
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${false}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + String(false) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `false`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
$(`false`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
