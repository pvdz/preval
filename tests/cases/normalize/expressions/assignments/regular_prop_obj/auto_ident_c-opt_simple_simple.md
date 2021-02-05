# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_c-opt_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b?.["x"]).a;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
let tmpNestedComplexRhs = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainRootComputed = 'x';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpNestedComplexRhs = tmpChainElementObject;
}
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
let tmpNestedComplexRhs = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpNestedComplexRhs = tmpChainElementObject;
}
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
