# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > assignments > logic_and_both > auto_ident_opt_call_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) && (a = $?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpNestedComplexRhs = tmpChainElementCall;
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainRootCall$1 = $;
  if (tmpChainRootCall$1) {
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
    tmpNestedComplexRhs$1 = tmpChainElementCall$1;
  }
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpNestedComplexRhs = tmpChainElementCall;
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainRootCall$1 = $;
  if (tmpChainRootCall$1) {
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
    tmpNestedComplexRhs$1 = tmpChainElementCall$1;
  }
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
