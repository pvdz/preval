# Preval test case

# spread_simple.md

> normalize > object > spread_simple
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj});
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
tmpObjPropValue = { bar: 10 };
const obj = { foo: tmpObjPropValue };
tmpArg = { ...obj };
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
tmpObjPropValue = { bar: 10 };
const obj = { foo: tmpObjPropValue };
tmpArg = { ...obj };
$(tmpArg);
`````

## Result

Should call `$` with:
[[{ foo: { bar: 10 } }], null];

Normalized calls: Same

Final output calls: Same
