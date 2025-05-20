# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = new (1, 2, b).$(1);
  }
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpClusterSSA_a /*:object*/ = new $(1);
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  $(new $(1));
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
  const d = new $( 1 );
  $( d );
}
else {
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
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
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
