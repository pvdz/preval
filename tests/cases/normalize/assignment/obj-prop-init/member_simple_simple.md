# Preval test case

# member_simple_simple.md

> normalize > assignment > obj-prop-init > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({foo: a.x = b});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
let a = { x: 10 };
let b = 2;
let c = 3;
a.x = b;
tmpObjPropValue = b;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
let a = { x: 10 };
a.x = 2;
tmpObjPropValue = 2;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, 2, 3);
`````
