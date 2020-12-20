# Preval test case

# min_false.md

> plusmin > min_false
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~false)
`````

## Output

`````js filename=intro
$(-1);
`````
