# Preval test case

# base.md

> Normalize > Unary > Void > Base
>
> Void is really just undefined

## Input

`````js filename=intro
$(void 5);
`````

## Pre Normal


`````js filename=intro
$(void 5);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
