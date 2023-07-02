# Preval test case

# float_tostring.md

> Dot call > Float tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const flt = 3.48;
const tmpCallVal = flt.toString;
const x = $dotCall(tmpCallVal, flt);
$(x);
`````

## Pre Normal

`````js filename=intro
const flt = 3.48;
const tmpCallVal = flt.toString;
const x = $dotCall(tmpCallVal, flt);
$(x);
`````

## Normalized

`````js filename=intro
const flt = 3.48;
const tmpCallVal = flt.toString;
const x = $dotCall(tmpCallVal, flt);
$(x);
`````

## Output

`````js filename=intro
$(`3.48`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '3.48'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
