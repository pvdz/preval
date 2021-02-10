# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > assignments > arr_element > auto_ident_opt_extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$((a = b?.x.y.z) + (a = b?.x.y.z));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$2 = tmpChainElementObject$1.z;
  tmpNestedComplexRhs = tmpChainElementObject$2;
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1 = undefined;
const tmpChainRootProp$1 = b;
if (tmpChainRootProp$1) {
  const tmpChainElementObject$3 = tmpChainRootProp$1.x;
  const tmpChainElementObject$4 = tmpChainElementObject$3.y;
  const tmpChainElementObject$5 = tmpChainElementObject$4.z;
  tmpNestedComplexRhs$1 = tmpChainElementObject$5;
}
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 200
 - 2: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
