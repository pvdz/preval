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

## Output

`````js filename=intro
var tmpArg;
tmpArg = false;
$(tmpArg);
`````

## Result

Should call `$` with:
[[false], null];

Normalized calls: Same

Final output calls: Same
