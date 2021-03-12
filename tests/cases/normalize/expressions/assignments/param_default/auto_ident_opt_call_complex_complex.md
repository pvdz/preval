# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($)?.($(1)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $($)?.($(1))) : tmpParamDefault;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpCallObj = tmpChainElementCall;
      const tmpCallVal = tmpCallObj.call;
      const tmpCalleeParam = tmpChainRootCall;
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpChainElementCall = $($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpCallVal = tmpChainElementCall.call;
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$1);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    }
    a = tmpNestedComplexRhs;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
