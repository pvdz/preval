# Preval test case

# min_false.md

> plusmin > min_false
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!false)
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = !false;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof false;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````
