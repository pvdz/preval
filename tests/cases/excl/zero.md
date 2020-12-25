# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!0);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = !0;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````