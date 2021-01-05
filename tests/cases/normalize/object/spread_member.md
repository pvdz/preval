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
var tmpArg;
var tmpObjSpreadArg;
const obj = { foo: { bar: 10 } };
tmpObjSpreadArg = obj.foo;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
const obj = { foo: { bar: 10 } };
tmpObjSpreadArg = obj.foo;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
`````
