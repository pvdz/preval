# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!undefined);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = !undefined;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````
