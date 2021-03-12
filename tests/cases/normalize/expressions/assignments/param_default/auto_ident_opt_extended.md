# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.x.y.z)) {}
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
      const tmpChainElementObject = tmpChainRootProp.x;
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      const tmpChainElementObject$2 = tmpChainElementObject$1.z;
      tmpNestedComplexRhs = tmpChainElementObject$2;
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
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
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = b != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = b.x;
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      const tmpChainElementObject$2 = tmpChainElementObject$1.z;
      tmpNestedComplexRhs = tmpChainElementObject$2;
    }
    a = tmpNestedComplexRhs;
  }
};
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
