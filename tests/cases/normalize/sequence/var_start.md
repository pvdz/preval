# Preval test case

# start.md

> normalize > sequence > start
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
const a = ((3, 4), 5, 6);
$(a);
`````

## Normalized

`````js filename=intro
3;
4;
5;
const a = 6;
$(a);
`````

## Uniformed

`````js filename=intro
8;
8;
8;
var x = 8;
x(x);
`````

## Output

`````js filename=intro
$(6);
`````
