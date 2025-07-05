# Preval test case

# ssa_if_hoisting_loop22.md

> If hoisting > Ai > Ssa if hoisting loop22
>
> Test if_hoisting and SSA infinite loop: identical var declarations with logical expressions

## Input

`````js filename=intro
const flag1 = $("flag1");
const flag2 = $("flag2");
if (flag1) {
  let logical1 = flag1 && flag2;
  $(logical1);
} else {
  let logical2 = flag1 && flag2;
  $(logical2);
}
`````


## Settled


`````js filename=intro
const flag1 /*:unknown*/ = $(`flag1`);
const flag2 /*:unknown*/ = $(`flag2`);
if (flag1) {
  $(flag2);
} else {
  $(flag1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const flag1 = $(`flag1`);
const flag2 = $(`flag2`);
if (flag1) {
  $(flag2);
} else {
  $(flag1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "flag1" );
const b = $( "flag2" );
if (a) {
  $( b );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const flag1 = $(`flag1`);
const flag2 = $(`flag2`);
if (flag1) {
  let logical1 = flag1;
  if (logical1) {
    logical1 = flag2;
    $(flag2);
  } else {
    $(logical1);
  }
} else {
  let logical2 = flag1;
  if (logical2) {
    logical2 = flag2;
    $(flag2);
  } else {
    $(logical2);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'flag1'
 - 2: 'flag2'
 - 3: 'flag2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
