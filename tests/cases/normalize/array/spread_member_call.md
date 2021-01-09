# Preval test case

# spread_member_call.md

> normalize > array > spread_member_call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
$([...true.toString()]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = true.toString();
tmpArg = [...tmpElement];
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = true.x();
x = [...x];
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = true.toString();
tmpArg = [...tmpElement];
$(tmpArg);
`````
