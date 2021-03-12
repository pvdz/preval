# Preval test case

# var_middle.md

> Normalize > Sequence > Var middle
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
const a = (1, 2, (3, 4), 5);
$(a);
`````

## Pre Normal

`````js filename=intro
const a = (1, 2, (3, 4), 5);
$(a);
`````

## Normalized

`````js filename=intro
const a = 5;
$(a);
`````

## Output

`````js filename=intro
$(5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
