# Preval test case

# plus_regex.md

> plusmin > plus_regex
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+/1/);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +/1/;
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
tmpArg = NaN;
$(tmpArg);
`````
