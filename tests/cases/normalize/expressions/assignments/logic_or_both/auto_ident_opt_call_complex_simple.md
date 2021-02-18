# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.(1)) || (a = $($)?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  a = tmpChainElementCall$1;
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$2 = tmpChainRootCall$1($);
  const tmpIfTest$1 = tmpChainElementCall$2 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$3 = tmpChainElementCall$2.call(tmpChainRootCall$1, 1);
    tmpNestedComplexRhs = tmpChainElementCall$3;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
  SSA_a = tmpChainElementCall$1;
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall$2 = $($);
  const tmpIfTest$1 = tmpChainElementCall$2 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$3 = tmpChainElementCall$2.call($, 1);
    tmpNestedComplexRhs = tmpChainElementCall$3;
  }
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
