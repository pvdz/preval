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

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: undefined

Normalized calls: Same

Final output calls: Same
