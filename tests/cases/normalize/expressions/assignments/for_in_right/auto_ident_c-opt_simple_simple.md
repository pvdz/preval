# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > assignments > for_in_right > auto_ident_c-opt_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = b?.["x"]));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainRootComputed = 'x';
    const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
    tmpNestedComplexRhs = tmpChainElementObject;
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
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs;
let tmpNestedComplexRhs = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpNestedComplexRhs = tmpChainElementObject;
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
