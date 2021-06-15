# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return $(b)?.[$("$")]?.($(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(b)?.[$(`$`)]?.($(1));
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $(`$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 = tmpChainElementObject != null;
    if (tmpIfTest$1) {
      const tmpCallCallee = $dotCall;
      const tmpCalleeParam = tmpChainElementObject;
      const tmpCalleeParam$1 = tmpChainElementCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
      tmpReturnArg = tmpChainElementCall$1;
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  } else {
    return tmpReturnArg;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$1(tmpCalleeParam$5);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall == null;
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpChainRootComputed = $(`$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 = tmpChainElementObject == null;
    if (tmpIfTest$1) {
      return undefined;
    } else {
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
      return tmpChainElementCall$1;
    }
  }
};
const b = { $: $ };
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
