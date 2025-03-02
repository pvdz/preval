# Preval test case

# neg_tostring.md

> Dot call > Neg tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const num = -500;
const tmpCallVal = num.toString;
const x = $dotCall(tmpCallVal, num, 'toString');
$(x);
`````

## Pre Normal


`````js filename=intro
const num = -500;
const tmpCallVal = num.toString;
const x = $dotCall(tmpCallVal, num, `toString`);
$(x);
`````

## Normalized


`````js filename=intro
const num = -500;
const x = num.toString();
$(x);
`````

## Output


`````js filename=intro
$(`-500`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "-500" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '-500'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
