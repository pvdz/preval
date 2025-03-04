# Preval test case

# ident.md

> Normalize > Member access > Call arg > Ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$($.length);
`````

## Pre Normal


`````js filename=intro
$($.length);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $.length;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $.length;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
