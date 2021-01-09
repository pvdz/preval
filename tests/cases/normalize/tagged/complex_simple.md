# Preval test case

# complex_simple.md

> normalize > templates > complex_simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ $(10) } ${ 20 } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(10);
$(tmpArg, tmpArg_1, 20);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = ['str', 'str', 'str'];
x = x(8);
x(x, x, 8);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(10);
$(tmpArg, tmpArg_1, 20);
`````
