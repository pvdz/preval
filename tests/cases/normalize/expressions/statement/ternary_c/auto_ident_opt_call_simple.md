# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $?.(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpChainRootCall = $;
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
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
  const tmpIfTest$1 = $ == null;
  if (tmpIfTest$1) {
  } else {
    $(1);
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
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
