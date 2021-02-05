# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > ternary_b > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$($(1) ? (a = b?.x?.y) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
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
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
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
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
