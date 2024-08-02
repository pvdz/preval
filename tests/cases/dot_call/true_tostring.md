# Preval test case

# true_tostring.md

> Dot call > True tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const bool = true;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool);
$(x);
`````

## Pre Normal


`````js filename=intro
const bool = true;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool);
$(x);
`````

## Normalized


`````js filename=intro
const bool = true;
const x = bool.toString();
$(x);
`````

## Output


`````js filename=intro
$(`true`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "true" );
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
