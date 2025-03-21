# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) && (a = $?.(1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpChainElementCall;
}
if (a) {
  const tmpIfTest$1 /*:boolean*/ = $ == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $(1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
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
let tmpCalleeParam = undefined;
if (!($ == null)) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpChainElementCall;
}
if (a) {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 = $(1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  a = d;
  b = d;
}
if (a) {
  const e = $ == null;
  if (e) {
    $( undefined );
    $( undefined );
  }
  else {
    const f = $( 1 );
    $( f );
    $( f );
  }
}
else {
  $( b );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
