# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($)?.($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($)?.($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$3);
  tmpBinBothRhs = tmpChainElementCall$1;
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpBinBothRhs = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallVal = tmpChainElementCall.call;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$3);
  tmpBinBothRhs = tmpChainElementCall$1;
}
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: NaN
 - 5: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
