# Preval test case

# nan_tostring_multi_arg.md

> Dot call > Nan tostring multi arg
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const naN = NaN;
const tmpCallVal = naN.toString;
const x = $dotCall(tmpCallVal, naN, 2, $, unknown);
$(x);
`````

## Pre Normal


`````js filename=intro
const naN = NaN;
const tmpCallVal = naN.toString;
const x = $dotCall(tmpCallVal, naN, 2, $, unknown);
$(x);
`````

## Normalized


`````js filename=intro
const naN = NaN;
const x = naN.toString(2, $, unknown);
$(x);
`````

## Output


`````js filename=intro
unknown;
$(`NaN`);
`````

## PST Output

With rename=true

`````js filename=intro
unknown;
$( "NaN" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
