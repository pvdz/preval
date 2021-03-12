# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Return > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.c.d.e?.(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = b?.c.d.e?.(1));
};
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$2 = tmpChainElementObject$1.e;
    const tmpIfTest$1 = tmpChainElementObject$2 != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
      a = tmpChainElementCall;
    }
  }
  let tmpReturnArg = a;
  return tmpReturnArg;
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  a = undefined;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject = b.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$2 = tmpChainElementObject$1.e;
    const tmpIfTest$1 = tmpChainElementObject$2 != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
      a = tmpChainElementCall;
    }
  }
  const tmpReturnArg = a;
  return tmpReturnArg;
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
