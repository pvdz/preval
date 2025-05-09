# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]) || (a = $(b)?.[$("x")]));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  a = tmpChainElementCall[tmpChainRootComputed];
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
    const tmpNestedComplexRhs /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$1];
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  a = tmpChainElementCall[tmpChainRootComputed];
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$1 = $(b);
  if (tmpChainElementCall$1 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 = $(`x`);
    const tmpNestedComplexRhs = tmpChainElementCall$1[tmpChainRootComputed$1];
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = $( "x" );
  a = c[ e ];
}
if (a) {
  $( a );
  $( a );
}
else {
  const f = $( b );
  const g = f == null;
  if (g) {
    $( undefined );
    $( undefined );
  }
  else {
    const h = $( "x" );
    const i = f[ h ];
    $( i );
    $( i );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
