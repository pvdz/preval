# Preval test case

# neg_zero_true.md

> eq > neg_zero_true
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
$(-0 !== -0);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -0 !== -0;
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
