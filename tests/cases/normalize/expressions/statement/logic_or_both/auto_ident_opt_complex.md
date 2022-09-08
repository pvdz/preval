# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.x || $(b)?.x;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(b)?.x || $(b)?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpIfTest = tmpChainElementObject;
} else {
}
if (tmpIfTest) {
} else {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = tmpChainRootCall$1(b);
  const tmpIfTest$3 = tmpChainElementCall$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$1 = tmpChainElementCall$1.x;
  } else {
  }
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpIfTest = false;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 = $(b);
  const tmpIfTest$3 = tmpChainElementCall$1 == null;
  if (tmpIfTest$3) {
  } else {
    tmpChainElementCall$1.x;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
