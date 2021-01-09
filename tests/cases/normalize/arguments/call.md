# Preval test case

# call.md

> normalize > arguments > call
>
> Normalizing call args when they are not identifier or literal

#TODO

## Input

`````js filename=intro
$($());
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = $();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = $();
$(tmpArg);
`````
