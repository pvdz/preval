# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($)?.(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = $($)?.(1));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
    a = tmpChainElementCall$1;
  }
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  a = undefined;
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
    a = tmpChainElementCall$1;
  }
  const tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
