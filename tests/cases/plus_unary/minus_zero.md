# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+(-0));
`````

## Normalized

`````js filename=intro
$(+-0);
`````

## Output

`````js filename=intro
$(-0);
`````
