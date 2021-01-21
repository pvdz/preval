# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!(-1));
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = !-1;
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
 - 0: false
 - 1: undefined

Normalized calls: Same

Final output calls: Same
