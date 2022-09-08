# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) && $?.(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) && $?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpIfTest$1 = tmpChainRootCall != null;
if (tmpIfTest$1) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
  const tmpChainRootCall$1 = $;
  const tmpIfTest$3 = tmpChainRootCall$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpIfTest = false;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall = $(1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  const tmpIfTest$3 = $ == null;
  if (tmpIfTest$3) {
  } else {
    $(1);
  }
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
