# Preval test case

# call.md

> normalize > new > call
>
> Make sure negative function calls are not considered a literal

#TODO

## Input

`````js filename=intro
$([-$()]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpUnaryArg;
tmpUnaryArg = $();
tmpElement = -tmpUnaryArg;
tmpArg = [tmpElement];
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = x();
x = -x;
x = [x];
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpUnaryArg;
tmpUnaryArg = $();
tmpElement = -tmpUnaryArg;
tmpArg = [tmpElement];
$(tmpArg);
`````
