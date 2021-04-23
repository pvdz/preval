# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = (1, 2, $(b))?.x).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
(a = (1, 2, $(b))?.x).a;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
let a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
const tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
