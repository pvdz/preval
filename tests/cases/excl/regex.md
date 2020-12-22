# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!/1/);
`````

## Normalized

`````js filename=intro
$(!/1/);
`````

## Output

`````js filename=intro
$(false);
`````
