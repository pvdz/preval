# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~/1/);
`````

## Output

`````js filename=intro
$(-2);
`````
