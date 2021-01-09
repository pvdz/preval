# Preval test case

# spread_call.md

> normalize > array > spread_call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
$([...$("foo")]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $('foo');
tmpArg = [...tmpElement];
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x('str');
x = [...x];
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $('foo');
tmpArg = [...tmpElement];
$(tmpArg);
`````
