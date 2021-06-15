# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = $(b)?.[$("$")]?.($(1));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { $: $ };
    let a = { a: 999, b: 1000 };
    a = $(b)?.[$(`$`)]?.($(1));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  a = undefined;
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
      a = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
let a = undefined;
const b = { $: $ };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    a = tmpChainElementCall$1;
  }
}
$(a);
$(undefined);
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
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
