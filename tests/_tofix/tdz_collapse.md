# Preval test case

# tdz_collapse.md

> Tests > Tofix > Tdz collapse
>
> We should collapse TDZ ident statements when we can see the next statement will test it too
> (There are cases where this doesn't happen...)

## Input

`````js filename=intro
TDZ
const x = TDZ + $; // This will always first evaluate TDZ
$(x);
`````

## Pre Normal


`````js filename=intro
TDZ;
const x = TDZ + $;
$(x);
`````

## Normalized


`````js filename=intro
const x = TDZ + $;
$(x);
`````

## Output


`````js filename=intro
const x /*:primitive*/ = TDZ + $;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = TDZ + $;
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

TDZ

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
