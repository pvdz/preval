# Preval test case

# prim_prim.md

> Ifelse > Ternary > Prim prim
>
> Should de-alias a ternary-const

## Input

`````js filename=intro
let softConst = undefined;
const b = $(1);
let softAlias = undefined;
if (b) {
  softConst = 2;
  softAlias = softConst;
} else {
  softConst = 3;
  softAlias = softConst;
}
if (softConst) {
  const e = $(4);
  $(e);
  $(softConst);
} else {
  $(softAlias);
  $(softConst);
}
`````


## Settled


`````js filename=intro
let softConst /*:number*/ /*ternaryConst*/ = 2;
const b /*:unknown*/ = $(1);
if (b) {
} else {
  softConst = 3;
}
const e /*:unknown*/ = $(4);
$(e);
$(softConst);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let softConst = 2;
if (!$(1)) {
  softConst = 3;
}
$($(4));
$(softConst);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  a = 3;
}
const c = $( 4 );
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let softConst = undefined;
const b = $(1);
let softAlias = undefined;
if (b) {
  softConst = 2;
  softAlias = softConst;
} else {
  softConst = 3;
  softAlias = softConst;
}
if (softConst) {
  const e = $(4);
  $(e);
  $(softConst);
} else {
  $(softAlias);
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
 - 2: 4
 - 3: 4
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
