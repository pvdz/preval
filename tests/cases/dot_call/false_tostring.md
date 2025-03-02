# Preval test case

# false_tostring.md

> Dot call > False tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const bool = false;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, 'toString');
$(x);
`````

## Pre Normal


`````js filename=intro
const bool = false;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, `toString`);
$(x);
`````

## Normalized


`````js filename=intro
const bool = false;
const x = bool.toString();
$(x);
`````

## Output


`````js filename=intro
$(`false`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "false" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
