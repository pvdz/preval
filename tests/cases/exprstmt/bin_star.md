# Preval test case

# bin_star.md

> Exprstmt > Bin star
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const x = 2 * $;
x * x;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = 2 * $;
x * x;
$(x);
`````

## Normalized


`````js filename=intro
const x = 2 * $;
x * 0;
x * 0;
$(x);
`````

## Output


`````js filename=intro
const x /*:number*/ = 2 * $;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 2 * $;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
