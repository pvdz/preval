# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) && (a = $($)?.($(1))));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpCalleeParam /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$5);
  a = tmpChainElementCall$1;
  tmpCalleeParam = tmpChainElementCall$1;
}
if (a) {
  const tmpChainElementCall$3 /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpCalleeParam$11 /*:unknown*/ = $(1);
    const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, tmpCalleeParam$11);
    $(tmpChainElementCall$5);
    $(tmpChainElementCall$5);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpCalleeParam = undefined;
if (!tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, undefined, $(1));
  a = tmpChainElementCall$1;
  tmpCalleeParam = tmpChainElementCall$1;
}
if (a) {
  const tmpChainElementCall$3 = $($);
  if (tmpChainElementCall$3 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, undefined, $(1));
    $(tmpChainElementCall$5);
    $(tmpChainElementCall$5);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) && (a = $($)?.($(1))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCalleeParam$1 = tmpChainElementCall;
  const tmpCalleeParam$3 = tmpChainRootCall;
  const tmpCalleeParam$5 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam$1, tmpCalleeParam$3, undefined, tmpCalleeParam$5);
  a = tmpChainElementCall$1;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = $($);
  const tmpIfTest$1 = tmpChainElementCall$3 != null;
  if (tmpIfTest$1) {
    const tmpCalleeParam$7 = tmpChainElementCall$3;
    const tmpCalleeParam$9 = tmpChainRootCall$1;
    const tmpCalleeParam$11 = $(1);
    const tmpChainElementCall$5 = $dotCall(tmpCalleeParam$7, tmpCalleeParam$9, undefined, tmpCalleeParam$11);
    tmpNestedComplexRhs = tmpChainElementCall$5;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = $( 1 );
  const f = $dotCall( b, $, undefined, e );
  a = f;
  d = f;
}
if (a) {
  const g = $( $ );
  const h = g == null;
  if (h) {
    $( undefined );
    $( undefined );
  }
  else {
    const i = $( 1 );
    const j = $dotCall( g, $, undefined, i );
    $( j );
    $( j );
  }
}
else {
  $( d );
  $( a );
}
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
 - 7: 1
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
