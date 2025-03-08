# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Logic or right > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($)?.($(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(100)) {
  const tmpChainElementCall = $($);
  if (!(tmpChainElementCall == null)) {
    $dotCall(tmpChainElementCall, $, undefined, $(1));
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($)?.($(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpChainRootCall = $;
  const tmpChainElementCall = $($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
  } else {
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {

}
else {
  const b = $( $ );
  const c = b == null;
  if (c) {

  }
  else {
    const d = $( 1 );
    $dotCall( b, $, undefined, d );
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

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
