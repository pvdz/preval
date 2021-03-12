# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x in (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
for (let x in (a = $(b)?.[$('$')]?.($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallObj = tmpChainElementObject;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
    a = tmpChainElementCall$1;
  }
}
let tmpForInDeclRhs = a;
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
let SSA_a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallVal = tmpChainElementObject.call;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$1);
    SSA_a = tmpChainElementCall$1;
  }
}
const tmpForInDeclRhs = SSA_a;
let x;
for (x in tmpForInDeclRhs) {
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
