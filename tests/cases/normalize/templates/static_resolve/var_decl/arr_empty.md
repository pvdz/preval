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
let x = `` + $coerce([], `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = [];
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output

`````js filename=intro
$(``);
`````

## PST Output

With rename=true

`````js filename=intro
$( "" );
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
