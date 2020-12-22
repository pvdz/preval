# Preval test case

# min_false.md

> plusmin > min_false
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!false)
`````

## Normalized

`````js filename=intro
$(!false);
`````

## Output

`````js filename=intro
$(true);
`````
