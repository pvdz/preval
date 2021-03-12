# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Let > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($)?.($(1));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($)?.($(1));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootCall;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
  xyz = tmpChainElementCall$1;
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallVal = tmpChainElementCall.call;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$1);
  xyz = tmpChainElementCall$1;
}
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
