# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > for_in_right > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (let x in (a = b?.x?.y));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
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
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs;
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
tmpForInDeclRhs = tmpNestedComplexRhs;
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
