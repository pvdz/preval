# Preval test case

# min_null.md

> plusmin > min_null
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!null);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = !null;
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
tmpArg = true;
$(tmpArg);
`````
