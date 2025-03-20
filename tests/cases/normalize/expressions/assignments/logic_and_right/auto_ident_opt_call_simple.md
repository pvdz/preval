# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = $?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpIfTest /*:boolean*/ = $ == null;
  if (tmpIfTest) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall /*:unknown*/ = $(1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall = $(1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $ == null;
  if (b) {
    $( undefined );
    $( undefined );
  }
  else {
    const c = $( 1 );
    $( c );
    $( c );
  }
}
else {
  $( a );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
