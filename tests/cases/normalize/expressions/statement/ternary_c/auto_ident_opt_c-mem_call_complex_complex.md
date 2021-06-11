# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Ternary c > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(b)?.[$("$")]?.($(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(b)?.[$('$')]?.($(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $('$');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpCallCallee = $dotCall;
      const tmpCalleeParam = tmpChainElementObject;
      const tmpCalleeParam$1 = tmpChainElementCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    } else {
    }
  } else {
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const b = { $: $ };
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed = $('$');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject == null;
    if (tmpIfTest$3) {
    } else {
      const tmpCalleeParam$3 = $(1);
      $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    }
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
