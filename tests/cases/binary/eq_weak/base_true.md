# Preval test case

# base_true.md

> eq > base_true
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(1 == 1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 1 == 1;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````
