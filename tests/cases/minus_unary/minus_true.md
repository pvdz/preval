# Preval test case

# min_true.md

> plusmin > min_true
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-true));
`````

## Normalized

`````js filename=intro
$(-(-true));
`````

## Output

`````js filename=intro
$(1);
`````
