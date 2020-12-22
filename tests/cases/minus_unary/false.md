# Preval test case

# min_false.md

> plusmin > min_false
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

Note: the -0 is observable. Object.is(0, !false) -> false

## Input

`````js filename=intro
$(-false)
`````

## Normalized

`````js filename=intro
$(-false);
`````

## Output

`````js filename=intro
$(-0);
`````
