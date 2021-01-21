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
