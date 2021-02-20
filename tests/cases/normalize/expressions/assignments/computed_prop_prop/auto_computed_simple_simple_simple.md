# Preval test case

# auto_computed_simple_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto computed simple simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { b: $(1) })];
a["b"] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
const obj = {};
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
obj[SSA_a];
SSA_a.b = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
