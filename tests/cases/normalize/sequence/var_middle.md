# Preval test case

# middle.md

> normalize > sequence > middle
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
