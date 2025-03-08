# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.($(1)) && $($)?.($(1));
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
  const tmpChainElementCall$3 /*:unknown*/ = $($);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$3) {
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    $dotCall(tmpChainElementCall$3, $, undefined, tmpCalleeParam$9);
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpIfTest = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
if (tmpIfTest) {
  const tmpChainElementCall$3 = $($);
  if (!(tmpChainElementCall$3 == null)) {
    $dotCall(tmpChainElementCall$3, $, undefined, $(1));
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.($(1)) && $($)?.($(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpCalleeParam = tmpChainElementCall;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
  tmpIfTest = tmpChainElementCall$1;
} else {
}
if (tmpIfTest) {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = $($);
  const tmpIfTest$3 = tmpChainElementCall$3 != null;
  if (tmpIfTest$3) {
    const tmpCalleeParam$5 = tmpChainElementCall$3;
    const tmpCalleeParam$7 = tmpChainRootCall$1;
    const tmpCalleeParam$9 = $(1);
    const tmpChainElementCall$5 = $dotCall(tmpCalleeParam$5, tmpCalleeParam$7, undefined, tmpCalleeParam$9);
  } else {
  }
} else {
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $( 1 );
  const e = $dotCall( b, $, undefined, d );
  a = e;
}
if (a) {
  const f = $( $ );
  const g = f == null;
  if (g) {

  }
  else {
    const h = $( 1 );
    $dotCall( f, $, undefined, h );
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: '<$>'
 - 5: 1
 - 6: 1
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
