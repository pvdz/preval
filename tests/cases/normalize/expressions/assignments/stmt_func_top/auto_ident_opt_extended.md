# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: { y: { z: 100 } } };

  let a = { a: 999, b: 1000 };
  a = b?.x.y.z;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { x: { y: { z: 100 } } };
  let a = { a: 999, b: 1000 };
  a = b?.x.y.z;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$1 = { z: 100 };
  const tmpObjLitVal = { y: tmpObjLitVal$1 };
  let b = { x: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$2 = tmpChainElementObject$1.z;
    a = tmpChainElementObject$2;
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
  const tmpObjLitVal$1 = { z: 100 };
  const tmpObjLitVal = { y: tmpObjLitVal$1 };
  const b = { x: tmpObjLitVal };
  let SSA_a = undefined;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject = b.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$2 = tmpChainElementObject$1.z;
    SSA_a = tmpChainElementObject$2;
  }
  $(SSA_a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
