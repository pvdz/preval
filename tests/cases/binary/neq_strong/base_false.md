# Preval test case

# base_false.md

> eq > base_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(1 !== 2);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 1 !== 2;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = 8 * 8;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````
