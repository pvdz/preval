# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 && $(2);
`````

## Normalized

`````js filename=intro
var tmpLogicalRight;
tmpLogicalRight = $(2);
const x = 1 && tmpLogicalRight;
`````

## Output

`````js filename=intro
var tmpLogicalRight;
tmpLogicalRight = $(2);
1 && tmpLogicalRight;
`````
