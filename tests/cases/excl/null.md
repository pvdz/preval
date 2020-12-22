# Preval test case

# min_null.md

> plusmin > min_null
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!null);
`````

## Normalized

`````js filename=intro
$(!null);
`````

## Output

`````js filename=intro
$(true);
`````
