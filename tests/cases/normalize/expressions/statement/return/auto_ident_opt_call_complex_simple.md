# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Return > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($)?.(1);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
    tmpReturnArg = tmpChainElementCall$1;
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
  }
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
  let tmpReturnArg = undefined;
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
    tmpReturnArg = tmpChainElementCall$1;
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
  }
};
const a = { a: 999, b: 1000 };
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
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
