# Preval test case

# neg_zero_true.md

> eq > neg_zero_true
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

Note: weak and strict equals can not detect negative zero this way.

## Input

`````js filename=intro
$(-0 <= -0);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -0 <= -0;
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
