# Preval test case

# undefined.md

> Tilde > Undefined
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~undefined);
`````

## Pre Normal


`````js filename=intro
$(~undefined);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -1;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-1);
`````

## PST Output

With rename=true

`````js filename=intro
$( -1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
