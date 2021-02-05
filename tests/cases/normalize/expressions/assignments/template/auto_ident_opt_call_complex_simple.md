# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > template > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($)?.(1))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  tmpNestedComplexRhs = tmpChainElementCall$1;
}
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  tmpNestedComplexRhs = tmpChainElementCall$1;
}
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 'before  1  after'
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
