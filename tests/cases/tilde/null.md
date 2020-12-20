# Preval test case

# min_null.md

> plusmin > min_null
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~null);
`````

## Output

`````js filename=intro
$(-1);
`````
