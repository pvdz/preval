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
