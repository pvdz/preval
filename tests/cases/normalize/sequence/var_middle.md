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
1;
2;
3;
4;
const a = 5;
$(a);
`````

## Output

`````js filename=intro
$(5);
`````

## Result

Should call `$` with:
[[5], null];

Normalized calls: Same

Final output calls: Same
