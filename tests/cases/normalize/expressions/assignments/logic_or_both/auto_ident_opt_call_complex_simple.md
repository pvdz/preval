# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.(1)) || (a = $($)?.(1)));
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
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  a = tmpChainElementCall$1;
  tmpCalleeParam = tmpChainElementCall$1;
}
if (a) {
  $(tmpCalleeParam);
} else {
  let tmpNestedComplexRhs /*:unknown*/ = undefined;
  const tmpChainElementCall$3 /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, 1);
    tmpNestedComplexRhs = tmpChainElementCall$5;
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpCalleeParam = undefined;
if (!tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, undefined, 1);
  a = tmpChainElementCall$1;
  tmpCalleeParam = tmpChainElementCall$1;
}
if (a) {
  $(tmpCalleeParam);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall$3 = $($);
  if (!(tmpChainElementCall$3 == null)) {
    tmpNestedComplexRhs = $dotCall(tmpChainElementCall$3, $, undefined, 1);
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.(1)) || (a = $($)?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
  a = tmpChainElementCall$1;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = tmpChainRootCall$1($);
  const tmpIfTest$1 = tmpChainElementCall$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, tmpChainRootCall$1, undefined, 1);
    tmpNestedComplexRhs = tmpChainElementCall$5;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
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
  const e = $dotCall( b, $, undefined, 1 );
  a = e;
  d = e;
}
if (a) {
  $( d );
}
else {
  let f = undefined;
  const g = $( $ );
  const h = g == null;
  if (h) {

  }
  else {
    const i = $dotCall( g, $, undefined, 1 );
    f = i;
  }
  a = f;
  $( f );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
