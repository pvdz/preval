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
if (tmpIfTest) {
} else {
  a = $dotCall(tmpChainElementCall, $, undefined, 1);
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$3 /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, 1);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  a = $dotCall(tmpChainElementCall, $, undefined, 1);
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$3 = $($);
  if (tmpChainElementCall$3 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs = $dotCall(tmpChainElementCall$3, $, undefined, 1);
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
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
  a = $dotCall( b, $, undefined, 1 );
}
if (a) {
  $( a );
  $( a );
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
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
