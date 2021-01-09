# Preval test case

# call.md

> normalize > new > call
>
> Make sure normalization doesn't choke over elided elements

## Input

`````js filename=intro
$([1, $(),, 2,, $(),,]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement_1;
tmpElement = $();
tmpElement_1 = $();
tmpArg = [1, tmpElement, , 2, , tmpElement_1, ,];
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = x();
x = x();
x = [8, x, , 8, , x, ,];
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement_1;
tmpElement = $();
tmpElement_1 = $();
tmpArg = [1, tmpElement, , 2, , tmpElement_1, ,];
$(tmpArg);
`````
