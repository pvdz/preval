# Preval test case

# min_true.md

> plusmin > min_true
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof true);
`````

## Normalized

`````js filename=intro
$(typeof true);
`````

## Output

`````js filename=intro
$('boolean');
`````
