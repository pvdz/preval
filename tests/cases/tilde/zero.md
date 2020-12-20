# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~0);
`````

## Output

`````js filename=intro
$(-1);
`````
