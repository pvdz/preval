# Preval test case

# simple_complex.md

> normalize > templates > simple_complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ 10 } ${ $(20) } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(20);
$(tmpArg, 10, tmpArg_1);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = ['str', 'str', 'str'];
x = x(8);
x(x, 8, x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(20);
$(tmpArg, 10, tmpArg_1);
`````
