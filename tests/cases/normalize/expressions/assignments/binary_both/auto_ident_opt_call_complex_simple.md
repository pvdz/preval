# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.(1)) + (a = $($)?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  a = tmpChainElementCall$1;
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$2 = tmpChainRootCall$1($);
if (tmpChainElementCall$2) {
  const tmpChainElementCall$3 = tmpChainElementCall$2.call(tmpChainRootCall$1, 1);
  a = tmpChainElementCall$3;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainElementCall = $($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
  a = tmpChainElementCall$1;
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainElementCall$2 = $($);
if (tmpChainElementCall$2) {
  const tmpChainElementCall$3 = tmpChainElementCall$2.call($, 1);
  a = tmpChainElementCall$3;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same