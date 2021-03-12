# Preval test case

# spread_array.md

> Normalize > Spread > Spread array
>
> Spreading an array literal can be resolved statically

#TODO

## Input

`````js filename=intro
const x = [...[1, 2, 3, 4]];
$(x);
`````

## Pre Normal

`````js filename=intro
const x = [...[1, 2, 3, 4]];
$(x);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3, 4];
$(x);
`````

## Output

`````js filename=intro
const x = [1, 2, 3, 4];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
