# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt c-mem call complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $(b)?.[$("$")]?.($(1));
    $(a);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { $: $ };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$2 = tmpChainElementCall != null;
  if (tmpIfTest$2) {
    const tmpChainRootComputed = $('$');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpCallObj = tmpChainElementObject;
      const tmpCallVal = tmpCallObj.call;
      const tmpCalleeParam = tmpChainElementCall;
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
      a = tmpChainElementCall$1;
    }
  }
  $(a);
}
`````

## Output

`````js filename=intro
const b = { $: $ };
let SSA_a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest$2 = tmpChainElementCall != null;
if (tmpIfTest$2) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpCallVal = tmpChainElementObject.call;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$1);
    SSA_a = tmpChainElementCall$1;
  }
}
$(SSA_a);
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
