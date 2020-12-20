# Preval test case

# min_true.md

> plusmin > min_true
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!true);
`````

## Output

`````js filename=intro
$(false);
`````
