# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > logic_and_right > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = $($)?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  if (tmpChainElementCall) {
    const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
