# Preval test case

# base_true.md

> eq > base_true
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(1 != 1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 1 != 1;
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
