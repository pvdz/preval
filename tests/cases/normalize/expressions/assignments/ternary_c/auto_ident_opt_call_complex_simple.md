# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($)?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const tmpChainElementCall /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $({ a: 999, b: 1000 });
} else {
  const tmpChainElementCall = $($);
  if (tmpChainElementCall == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs = $dotCall(tmpChainElementCall, $, undefined, 1);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 100 );
  $( b );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c );
}
else {
  const d = $( $ );
  const e = d == null;
  if (e) {
    $( undefined );
    $( undefined );
  }
  else {
    const f = $dotCall( d, $, undefined, 1 );
    $( f );
    $( f );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
