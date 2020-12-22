# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof undefined);
`````

## Normalized

`````js filename=intro
$(typeof undefined);
`````

## Output

`````js filename=intro
$('undefined');
`````
