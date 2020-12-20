# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~undefined);
`````

## Output

`````js filename=intro
$(-1);
`````
