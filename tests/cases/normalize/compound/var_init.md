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
var tmpBinaryLeft;
var tmpBinaryRight;
var x;
let a = $(1);
tmpBinaryLeft = a;
tmpBinaryRight = $(2);
a = tmpBinaryLeft + tmpBinaryRight;
x = a;
$(x);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var x;
let a = $(1);
tmpBinaryLeft = a;
tmpBinaryRight = $(2);
a = tmpBinaryLeft + tmpBinaryRight;
x = a;
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
