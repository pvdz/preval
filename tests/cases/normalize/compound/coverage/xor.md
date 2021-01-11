# Preval test case

# xor.md

> normalize > compound > coverage > xor
>
> Compound assignments should destructure to regular assignments

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a ^= b;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
a = a ^ b;
$(a);
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = 8;
x = x * x;
x(x);
`````

## Output

`````js filename=intro
let a = 1;
a = a ^ 2;
$(a);
`````
