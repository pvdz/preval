# Preval test case

# spread_member.md

> normalize > array > spread_member
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj.foo});
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
var tmpObjSpreadArg;
tmpObjPropValue = { bar: 10 };
const obj = { foo: tmpObjPropValue };
tmpObjSpreadArg = obj.foo;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = { x: 8 };
var x = { x: x };
x = x.x;
x = { ...x };
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
var tmpObjSpreadArg;
tmpObjPropValue = { bar: 10 };
const obj = { foo: tmpObjPropValue };
tmpObjSpreadArg = obj.foo;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
`````
