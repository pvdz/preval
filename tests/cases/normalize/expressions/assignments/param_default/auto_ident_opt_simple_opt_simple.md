# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > param_default > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.x?.y)) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
      if (tmpChainElementObject) {
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        tmpNestedComplexRhs = tmpChainElementObject$1;
      }
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
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
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
      if (tmpChainElementObject) {
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        tmpNestedComplexRhs = tmpChainElementObject$1;
      }
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same