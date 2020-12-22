# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-/1/));
`````

## Normalized

`````js filename=intro
$(-(-/1/));
`````

## Output

`````js filename=intro
$(NaN);
`````
