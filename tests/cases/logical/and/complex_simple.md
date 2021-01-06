# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) && 2;
`````

## Normalized

`````js filename=intro
var tmpLogicalLeft;
tmpLogicalLeft = $(1);
const x = tmpLogicalLeft && 2;
`````

## Output

`````js filename=intro
var tmpLogicalLeft;
tmpLogicalLeft = $(1);
tmpLogicalLeft && 2;
`````
