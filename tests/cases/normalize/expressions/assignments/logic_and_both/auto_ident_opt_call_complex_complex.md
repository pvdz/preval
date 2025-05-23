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
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$1);
}
if (a) {
  const tmpChainElementCall$3 /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, tmpCalleeParam$3);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  a = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
if (a) {
  const tmpChainElementCall$3 = $($);
  if (tmpChainElementCall$3 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs = $dotCall(tmpChainElementCall$3, $, undefined, $(1));
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(a);
  $(a);
}
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
  a = $dotCall( b, $, undefined, d );
}
if (a) {
  const e = $( $ );
  const f = e == null;
  if (f) {
    $( undefined );
    $( undefined );
  }
  else {
    const g = $( 1 );
    const h = $dotCall( e, $, undefined, g );
    $( h );
    $( h );
  }
}
else {
  $( a );
  $( a );
}
`````


## Todos triggered


None


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
