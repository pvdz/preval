# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident c-opt simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = b?.["x"]) || (a = b?.["x"]));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = b?.[`x`]) || (a = b?.[`x`]));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$1 = tmpChainRootProp$1 != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = `x`;
    const tmpChainElementObject$1 = tmpChainRootProp$1[tmpChainRootComputed$1];
    tmpNestedComplexRhs = tmpChainElementObject$1;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpIfTest = b == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject = b.x;
  a = tmpChainElementObject;
  if (tmpChainElementObject) {
    $(tmpChainElementObject);
  } else {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = b == null;
    if (tmpIfTest$1) {
    } else {
      const tmpChainElementObject$1 = b.x;
      tmpNestedComplexRhs = tmpChainElementObject$1;
    }
    a = tmpNestedComplexRhs;
    $(tmpNestedComplexRhs);
  }
}
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
