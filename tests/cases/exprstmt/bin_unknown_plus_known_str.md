# Preval test case

# bin_unknown_plus_known_str.md

> Exprstmt > Bin unknown plus known str
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const x = "" * $;
x + $;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = `` * $;
x + $;
$(x);
`````

## Normalized


`````js filename=intro
const x = 0 * $;
x + $;
$(x);
`````

## Output


`````js filename=intro
$ + 0;
const x /*:number*/ = 0 * $;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$ + 0;
const a = 0 * $;
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
