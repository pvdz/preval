# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > arr_element > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = b?.x?.y) + (a = b?.x?.y));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  if (tmpChainElementObject) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    a = tmpChainElementObject$1;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
if (tmpChainRootProp$1) {
  const tmpChainElementObject$2 = tmpChainRootProp$1.x;
  if (tmpChainElementObject$2) {
    const tmpChainElementObject$3 = tmpChainElementObject$2.y;
    a = tmpChainElementObject$3;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  if (tmpChainElementObject) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    a = tmpChainElementObject$1;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
if (tmpChainRootProp$1) {
  const tmpChainElementObject$2 = tmpChainRootProp$1.x;
  if (tmpChainElementObject$2) {
    const tmpChainElementObject$3 = tmpChainElementObject$2.y;
    a = tmpChainElementObject$3;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same