# Preval test case

# plus_undefined.md

> plusmin > plus_undefined
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+undefined);
`````

## Output

`````js filename=intro
$(NaN);
`````
