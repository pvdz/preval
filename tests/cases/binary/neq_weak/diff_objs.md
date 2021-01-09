# Preval test case

# diff_objs.md

> eq > diff_objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
$({} != {});
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = {} != {};
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = {} * {};
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = {} != {};
$(tmpArg);
`````
