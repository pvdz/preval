# Preval test case

# bin_star.md

> Exprstmt > Bin star
>
> Expression statements can be eliminated if we have enough information

#TODO

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
const x = 2 * $;
$(x);
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