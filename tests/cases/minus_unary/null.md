# Preval test case

# min_null.md

> plusmin > min_null
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-null);
`````

## Output

`````js filename=intro
$(-0);
`````
