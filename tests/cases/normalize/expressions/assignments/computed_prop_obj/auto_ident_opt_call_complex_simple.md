# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $($)?.(1))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  tmpNestedComplexRhs = tmpChainElementCall$1;
}
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  tmpNestedComplexRhs = tmpChainElementCall$1;
}
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
