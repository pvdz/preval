# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.(1) && $($)?.(1);
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
  const tmpChainElementCall$3 /*:unknown*/ = $($);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$3) {
  } else {
    $dotCall(tmpChainElementCall$3, $, undefined, 1);
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
  tmpIfTest = $dotCall(tmpChainElementCall, $, undefined, 1);
}
if (tmpIfTest) {
  const tmpChainElementCall$3 = $($);
  if (!(tmpChainElementCall$3 == null)) {
    $dotCall(tmpChainElementCall$3, $, undefined, 1);
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.(1) && $($)?.(1);
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
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
  tmpIfTest = tmpChainElementCall$1;
} else {
}
if (tmpIfTest) {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = $($);
  const tmpIfTest$3 = tmpChainElementCall$3 != null;
  if (tmpIfTest$3) {
    const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, tmpChainRootCall$1, undefined, 1);
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
  const d = $dotCall( b, $, undefined, 1 );
  a = d;
}
if (a) {
  const e = $( $ );
  const f = e == null;
  if (f) {

  }
  else {
    $dotCall( e, $, undefined, 1 );
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
