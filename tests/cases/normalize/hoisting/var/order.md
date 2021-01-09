# Preval test case

# order.md

> normalize > hoisting > var > order
>
> Check order of moving them up. We try to keep the order, even if it shouldn't matter.

#TODO

## Input

`````js filename=intro
$(a, b, c);
var a = $();
var b = $();
var c = $();
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
$(a, b, c);
a = $();
b = $();
c = $();
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x(x, x, x);
var x = x();
var x = x();
var x = x();
`````

## Output

`````js filename=intro
var a;
var b;
var c;
$(a, b, c);
a = $();
b = $();
c = $();
`````
