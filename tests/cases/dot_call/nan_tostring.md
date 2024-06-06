# Preval test case

# nan_tostring.md

> Dot call > Nan tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const naN = NaN;
const tmpCallVal = naN.toString;
const x = $dotCall(tmpCallVal, naN);
$(x);
`````

## Pre Normal


`````js filename=intro
const naN = NaN;
const tmpCallVal = naN.toString;
const x = $dotCall(tmpCallVal, naN);
$(x);
`````

## Normalized


`````js filename=intro
const naN = NaN;
const tmpCallVal = naN.toString;
const x = $dotCall(tmpCallVal, naN);
$(x);
`````

## Output


`````js filename=intro
$(`NaN`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "NaN" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
