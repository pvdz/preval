# Preval test case

# true.md

> Normalize > Templates > Static resolve > Var decl > True
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${true}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + true + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinLhs = `true`;
let x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
$(`true`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'true'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
