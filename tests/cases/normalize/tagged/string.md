# Preval test case

# string.md

> normalize > templates > string
>
> A tagged template that is just a string

#TODO

## Input

`````js filename=intro
$`foo`;
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ['foo'];
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = ['str'];
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = ['foo'];
$(tmpArg);
`````
