# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Assign > Arr empty
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${[]}`;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = `` + $coerce([], `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpCalleeParam = [];
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
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
