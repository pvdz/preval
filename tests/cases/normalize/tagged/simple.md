# Preval test case

# simple.md

> normalize > templates > simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ $(1) } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' def'];
tmpArg_1 = $(1);
$(tmpArg, tmpArg_1);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = ['str', 'str'];
x = x(8);
x(x, x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' def'];
tmpArg_1 = $(1);
$(tmpArg, tmpArg_1);
`````
