# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident c-opt simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b?.["x"])];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b?.['x'])];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = 'x';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const obj = {};
let a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  a = tmpChainElementObject;
} else {
}
const tmpCompProp = a;
obj[tmpCompProp];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
