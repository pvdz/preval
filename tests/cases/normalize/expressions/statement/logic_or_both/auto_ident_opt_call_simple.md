# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) || $?.(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) || $?.(1);
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
} else {
  const tmpChainRootCall$1 = $;
  const tmpIfTest$3 = tmpChainRootCall$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  } else {
  }
}
$(a);
`````

## Output


`````js filename=intro
let tmpIfTest = false;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall = $(1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
} else {
  const tmpIfTest$3 = $ == null;
  if (tmpIfTest$3) {
  } else {
    $(1);
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
const b = $ == null;
if (b) {

}
else {
  const c = $( 1 );
  a = c;
}
if (a) {

}
else {
  const d = $ == null;
  if (d) {

  }
  else {
    $( 1 );
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
