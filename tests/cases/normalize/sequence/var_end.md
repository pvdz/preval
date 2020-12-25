# Preval test case

# end.md

> normalize > sequence > end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
const a = (1, 2, (3, 4));
$(a);
`````

## Normalized

`````js filename=intro
1;
2;
3;
const a = 4;
$(a);
`````

## Output

`````js filename=intro
$(4);
`````