# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) || (a = $?.(1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpIfTest$1 /*:boolean*/ = $ == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $(1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if (!($ == null)) {
  a = $(1);
}
if (a) {
  $(a);
  $(a);
} else {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 = $(1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = $( 1 );
  a = c;
}
if (a) {
  $( a );
  $( a );
}
else {
  const d = $ == null;
  if (d) {
    $( undefined );
    $( undefined );
  }
  else {
    const e = $( 1 );
    $( e );
    $( e );
  }
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
