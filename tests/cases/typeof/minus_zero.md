# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof -0);
`````

## Normalized

`````js filename=intro
$(typeof -0);
`````

## Output

`````js filename=intro
$('number');
`````
