# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b?.c(1)).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let obj = {};
(a = b?.c(1)).a;
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
  a = tmpChainElementCall;
} else {
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const b = { c: $ };
let a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementCall = tmpChainElementObject.call(b, 1);
  a = tmpChainElementCall;
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
