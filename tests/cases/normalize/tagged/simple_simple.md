# Preval test case

# simple_simple.md

> normalize > templates > simple_simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ 10 } ${ 20 } def`;
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ['abc ', ' ', ' def'];
$(tmpArg, 10, 20);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = ['abc ', ' ', ' def'];
$(tmpArg, 10, 20);
`````
