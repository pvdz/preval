# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: { d: { e: $ } } };

  let a = { a: 999, b: 1000 };
  b?.c.d.e?.(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { c: { d: { e: $ } } };
  let a = { a: 999, b: 1000 };
  b?.c.d.e?.(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  let b = { c: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$2 = tmpChainElementObject$1.e;
    const tmpIfTest$1 = tmpChainElementObject$2 != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    }
  }
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  const b = { c: tmpObjLitVal };
  const a = { a: 999, b: 1000 };
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject = b.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$2 = tmpChainElementObject$1.e;
    const tmpIfTest$1 = tmpChainElementObject$2 != null;
    if (tmpIfTest$1) {
      tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    }
  }
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
