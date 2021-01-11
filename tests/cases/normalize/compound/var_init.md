# Preval test case

# plus_eq.md

> normalize > compound > plus_eq
>
> Compound assignments should be decomposed. This means fewer cases to worry about. We can recompose them in the last step.

#TODO

## Input

`````js filename=intro
let a = $(1);
var x = a += $(2);
$(x);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var x;
let a = $(1);
tmpBinaryRight = $(2);
a = a + tmpBinaryRight;
x = a;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = x(8);
x = x(8);
x = x * x;
var x = x;
x(x);
`````

## Output

`````js filename=intro
var tmpBinaryRight;
var x;
let a = $(1);
tmpBinaryRight = $(2);
a = a + tmpBinaryRight;
x = a;
$(x);
`````
