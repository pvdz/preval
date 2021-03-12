# Preval test case

# var_start.md

> Normalize > Sequence > Var start
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
const a = ((3, 4), 5, 6);
$(a);
`````

## Pre Normal

`````js filename=intro
const a = ((3, 4), 5, 6);
$(a);
`````

## Normalized

`````js filename=intro
const a = 6;
$(a);
`````

## Output

`````js filename=intro
$(6);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
