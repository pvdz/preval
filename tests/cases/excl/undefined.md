# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!undefined);
`````

## Normalized

`````js filename=intro
$(!undefined);
`````

## Output

`````js filename=intro
$(true);
`````
