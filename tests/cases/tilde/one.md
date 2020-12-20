# Preval test case

# min_one.md

> plusmin > min_one
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~1);
`````

## Output

`````js filename=intro
$(-2);
`````
