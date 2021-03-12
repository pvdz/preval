# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("$")]?.($(1))) ? $(100) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a = $(b)?.[$('$')]?.($(1))) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpCallObj = tmpChainElementObject;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam$1 = tmpChainElementCall;
    const tmpCalleeParam$2 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$2);
    a = tmpChainElementCall$1;
  }
}
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
let tmpCalleeParam = undefined;
let SSA_a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpCallVal = tmpChainElementObject.call;
    const tmpCalleeParam$2 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$2);
    SSA_a = tmpChainElementCall$1;
  }
}
const tmpIfTest = SSA_a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
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
 - 5: 100
 - 6: 100
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
