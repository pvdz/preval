# Preval test case

# call.md

> normalize > new > call
>
> Make sure negative numbers are considered a literal too

The AST node for negative numbers is a unary expression so it requires an explicit check for negative numbers.

## Input

`````js filename=intro
$([-100]);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = [-100];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = [-100];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [-100]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
