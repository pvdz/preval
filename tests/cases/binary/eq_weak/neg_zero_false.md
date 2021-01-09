# Preval test case

# neg_zero_false.md

> eq > neg_zero_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

Note: weak and strict equals can not detect negative zero this way.

## Input

`````js filename=intro
$(-0 == 0);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -0 == 0;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = -8 * 8;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = true;
$(tmpArg);
`````
