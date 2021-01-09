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
var tmpArg;
tmpArg = !/1/;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof /regex/;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = false;
$(tmpArg);
`````
