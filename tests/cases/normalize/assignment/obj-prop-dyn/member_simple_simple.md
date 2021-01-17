# Preval test case

# member_simple_simple.md

> normalize > assignment > obj-prop-dyn > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({[(a.x = b)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
let a = { x: 10 };
let b = 2;
let c = 3;
a.x = b;
tmpComputedKey = b;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
let a = { x: 10 };
a.x = 2;
tmpComputedKey = 2;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, 2, 3);
`````
