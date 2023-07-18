# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Var decl > Arr numbers
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = `${[1,2,3]}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = `` + $coerce([1, 2, 3], `string`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = [1, 2, 3];
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output

`````js filename=intro
$(`1,2,3`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "1,2,3" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
