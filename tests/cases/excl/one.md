# Preval test case

# min_one.md

> plusmin > min_one
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = !1;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof 8;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = false;
$(tmpArg);
`````
