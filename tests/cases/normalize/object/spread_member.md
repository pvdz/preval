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
var tmpObjPropValue;
var tmpObjSpreadArg;
tmpObjPropValue = { bar: 10 };
const obj = { foo: tmpObjPropValue };
tmpObjSpreadArg = obj.foo;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpObjSpreadArg;
tmpObjPropValue = { bar: 10 };
const obj = { foo: tmpObjPropValue };
tmpObjSpreadArg = obj.foo;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {"bar":10}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
