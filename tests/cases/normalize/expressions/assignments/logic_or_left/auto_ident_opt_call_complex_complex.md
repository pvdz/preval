# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) || $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) || $(100));
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
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$3);
  a = tmpChainElementCall$1;
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
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
  const tmpCallVal = tmpChainElementCall.call;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$3);
  SSA_a = tmpChainElementCall$1;
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
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
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
