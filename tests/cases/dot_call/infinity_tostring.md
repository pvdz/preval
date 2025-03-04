# Preval test case

# infinity_tostring.md

> Dot call > Infinity tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const inf = Infinity;
const tmpCallVal = inf.toString;
const x = $dotCall(tmpCallVal, inf, 'toString');
$(x);
`````

## Pre Normal


`````js filename=intro
const inf = Infinity;
const tmpCallVal = inf.toString;
const x = $dotCall(tmpCallVal, inf, `toString`);
$(x);
`````

## Normalized


`````js filename=intro
const inf = Infinity;
const x = inf.toString();
$(x);
`````

## Output


`````js filename=intro
$(`Infinity`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "Infinity" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
