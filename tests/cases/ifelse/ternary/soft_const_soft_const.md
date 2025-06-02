# Preval test case

# soft_const_soft_const.md

> Ifelse > Ternary > Soft const soft const
>
> Should de-alias a ternary-const

## Input

`````js filename=intro
let softConst = undefined;
const b = $(1);
let alias = undefined;
if (b) {
  softConst = $(2);
  alias = softConst;
} else {
  softConst = $(3);
  alias = softConst;
}
if (softConst) {
  const e = $(4);
  $(e);
  $(softConst);
} else {
  $(alias);
  $(softConst);
}
`````


## Settled


`````js filename=intro
let softConst /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:unknown*/ = $(1);
if (b) {
  softConst = $(2);
} else {
  softConst = $(3);
}
if (softConst) {
  const e /*:unknown*/ = $(4);
  $(e);
  $(softConst);
} else {
  $(softConst);
  $(softConst);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let softConst = undefined;
if ($(1)) {
  softConst = $(2);
} else {
  softConst = $(3);
}
if (softConst) {
  $($(4));
  $(softConst);
} else {
  $(softConst);
  $(softConst);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 2 );
}
else {
  a = $( 3 );
}
if (a) {
  const c = $( 4 );
  $( c );
  $( a );
}
else {
  $( a );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let softConst = undefined;
const b = $(1);
let alias = undefined;
if (b) {
  softConst = $(2);
  alias = softConst;
} else {
  softConst = $(3);
  alias = softConst;
}
if (softConst) {
  const e = $(4);
  $(e);
  $(softConst);
} else {
  $(alias);
  $(softConst);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 4
 - 4: 4
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
