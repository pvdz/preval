# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Assign > Arr numbers
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${[1,2,3]}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = `` + $coerce([1, 2, 3], `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpCalleeParam = [1, 2, 3];
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
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
