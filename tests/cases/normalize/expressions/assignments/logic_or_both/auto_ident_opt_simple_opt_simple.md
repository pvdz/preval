# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = b?.x?.y) || (a = b?.x?.y));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
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
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.x;
    if (tmpChainElementObject$2) {
      const tmpChainElementObject$3 = tmpChainElementObject$2.y;
      tmpNestedComplexRhs$1 = tmpChainElementObject$3;
    }
  }
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpCalleeParam;
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
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.x;
    if (tmpChainElementObject$2) {
      const tmpChainElementObject$3 = tmpChainElementObject$2.y;
      tmpNestedComplexRhs$1 = tmpChainElementObject$3;
    }
  }
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
