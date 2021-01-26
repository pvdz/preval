# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
let x = 10;
x = obj['a'].b;
$(x);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
let x = 10;
x = obj['a'].b;
$(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
let x = 10;
x = obj['a'].b;
$(x);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
