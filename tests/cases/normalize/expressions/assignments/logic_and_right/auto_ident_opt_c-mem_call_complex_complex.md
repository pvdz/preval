# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)?.[$(`$`)]?.($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $(`$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 = tmpChainElementObject != null;
    if (tmpIfTest$1) {
      const tmpCallCallee$1 = $dotCall;
      const tmpCalleeParam$1 = tmpChainElementObject;
      const tmpCalleeParam$3 = tmpChainElementCall;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
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
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$5);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
