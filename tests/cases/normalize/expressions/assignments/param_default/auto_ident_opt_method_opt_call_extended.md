# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.c.d.e?.(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = b?.c.d.e?.(1)) : tmpParamDefault;
};
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest$1 = tmpChainRootProp != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$2 = tmpChainElementObject$1.e;
      const tmpIfTest$2 = tmpChainElementObject$2 != null;
      if (tmpIfTest$2) {
        const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
        tmpNestedComplexRhs = tmpChainElementCall;
      }
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
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
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = b != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = b.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$2 = tmpChainElementObject$1.e;
      const tmpIfTest$2 = tmpChainElementObject$2 != null;
      if (tmpIfTest$2) {
        const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
        tmpNestedComplexRhs = tmpChainElementCall;
      }
    }
    a = tmpNestedComplexRhs;
  }
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
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
