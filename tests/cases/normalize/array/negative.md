# Preval test case

# call.md

> normalize > new > call
>
> Make sure negative numbers are considered a literal too

The AST node for negative numbers is a unary expression so it requires an explicit check for negative numbers.

## Input

`````js filename=intro
$([-100]);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = [-100];
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = [-8];
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = [-100];
$(tmpArg);
`````
