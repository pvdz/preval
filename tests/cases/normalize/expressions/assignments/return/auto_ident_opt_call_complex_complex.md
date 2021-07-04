# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($)?.($(1)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $($)?.($(1)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    a = tmpChainElementCall$1;
    return a;
  } else {
    return a;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$1(tmpCalleeParam$5);
$(a);
`````

## Output

`````js filename=intro
let tmpClusterSSA_a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  tmpClusterSSA_a = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
}
$(tmpClusterSSA_a);
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
