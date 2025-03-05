# Preval test case

# minus_zero.md

> Tilde > Minus zero
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~(-0));
`````

## Pre Normal


`````js filename=intro
$(~-0);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -1;
$(tmpCalleeParam);
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
