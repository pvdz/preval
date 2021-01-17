# Preval test case

# member_simple_simple.md

> normalize > assignment > call-spread > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(...(a.x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = { x: 10 };
let b = 2;
let c = 3;
a.x = b;
tmpArg = b;
$(...tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = { x: 10 };
a.x = 2;
tmpArg = 2;
$(...tmpArg);
$(a, 2, 3);
`````
