# Preval test case

# call.md

> normalize > new > call
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

#TODO

## Input

`````js filename=intro
$(new ($()));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNewObj;
tmpNewObj = $();
tmpArg = new tmpNewObj();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x();
x = new x();
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNewObj;
tmpNewObj = $();
tmpArg = new tmpNewObj();
$(tmpArg);
`````
