# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) && $(2);
`````

## Normalized

`````js filename=intro
var tmpLogicalLeft;
var tmpLogicalRight;
tmpLogicalLeft = $(1);
tmpLogicalRight = $(2);
const x = tmpLogicalLeft && tmpLogicalRight;
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x(8);
x = x(8);
var x = x && x;
`````

## Output

`````js filename=intro
var tmpLogicalLeft;
var tmpLogicalRight;
tmpLogicalLeft = $(1);
tmpLogicalRight = $(2);
tmpLogicalLeft && tmpLogicalRight;
`````
