# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = (1, 2, $(b))?.x;
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const b /*:object*/ = { x: 1 };
  const tmpChainRootProp /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
    $(tmpChainElementObject);
  }
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpChainRootProp = $({ x: 1 });
  if (tmpChainRootProp == null) {
    $(undefined);
  } else {
    $(tmpChainRootProp.x);
  }
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = { x: 1 };
  const e = $( d );
  const f = e == null;
  if (f) {
    $( undefined );
  }
  else {
    const g = e.x;
    $( g );
  }
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
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
 - 3: { x: '1' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
