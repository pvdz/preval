# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident opt simple opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f(p = b?.x?.y) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? b?.x?.y : tmpParamDefault;
};
let b = { x: { y: 1 } };
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
    p = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest$1 = tmpChainRootProp != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainRootProp.x;
      const tmpIfTest$2 = tmpChainElementObject != null;
      if (tmpIfTest$2) {
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        p = tmpChainElementObject$1;
      }
    }
  } else {
    p = tmpParamDefault;
  }
};
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
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
    const tmpIfTest$1 = b != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = b.x;
      const tmpIfTest$2 = tmpChainElementObject != null;
      if (tmpIfTest$2) {
        tmpChainElementObject.y;
      }
    }
  }
};
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
