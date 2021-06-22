# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Var decl > Arr empty
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${[]}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + String([]) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = String;
const tmpCalleeParam = [];
const tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [];
const tmpBinBothRhs = String(tmpCalleeParam);
$(tmpBinBothRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
