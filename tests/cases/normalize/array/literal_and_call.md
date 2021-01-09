# Preval test case

# call.md

> normalize > new > call
>
> Make sure empty array works

## Input

`````js filename=intro
$([100, $()]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $();
tmpArg = [100, tmpElement];
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x();
x = [8, x];
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $();
tmpArg = [100, tmpElement];
$(tmpArg);
`````
