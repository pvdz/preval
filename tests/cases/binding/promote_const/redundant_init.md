# Preval test case

# redundant_init.md

> Binding > Promote const > Redundant init
>
> Explicitly initializes a let, only to override it

## Input

`````js filename=intro
const SSA_SNe$596 = $([10, 20, 30, 40]);
function f() {
  if (tmpIfTest$32854) {
    let tmpReturnArg$21651 = undefined;
    const tmpCalleeParam$36039 = $(1);
    const tmpCalleeParam$36040 = $(2);
    const tmpCalleeParam$36041 = SSA_SNe$596[4];
    const tmpCalleeParam$36042 = SSA_SNe$596[2];
    const tmpCalleeParam$36043 = SSA_SNe$596[3];
    const tmpCalleeParam$36044 = SSA_SNe$596[1];
    tmpReturnArg$21651 = $(
      100,
      tmpCalleeParam$36039,
      101,
      tmpCalleeParam$36040,
      tmpCalleeParam$36041,
      tmpCalleeParam$36042,
      tmpCalleeParam$36043,
      102,
      tmpCalleeParam$36044,
    );
    return tmpReturnArg$21651;
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [10, 20, 30, 40];
const SSA_SNe$596 /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest$32854) {
  const tmpCalleeParam$36039 /*:unknown*/ = $(1);
  const tmpCalleeParam$36040 /*:unknown*/ = $(2);
  const tmpCalleeParam$36041 /*:unknown*/ = SSA_SNe$596[4];
  const tmpCalleeParam$36042 /*:unknown*/ = SSA_SNe$596[2];
  const tmpCalleeParam$36043 /*:unknown*/ = SSA_SNe$596[3];
  const tmpCalleeParam$36044 /*:unknown*/ = SSA_SNe$596[1];
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(
    100,
    tmpCalleeParam$36039,
    101,
    tmpCalleeParam$36040,
    tmpCalleeParam$36041,
    tmpCalleeParam$36042,
    tmpCalleeParam$36043,
    102,
    tmpCalleeParam$36044,
  );
  $(tmpClusterSSA_tmpCalleeParam$1);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const SSA_SNe$596 = $([10, 20, 30, 40]);
if (tmpIfTest$32854) {
  const tmpCalleeParam$36039 = $(1);
  const tmpCalleeParam$36040 = $(2);
  const tmpCalleeParam$36041 = SSA_SNe$596[4];
  const tmpCalleeParam$36042 = SSA_SNe$596[2];
  const tmpCalleeParam$36043 = SSA_SNe$596[3];
  $(
    $(
      100,
      tmpCalleeParam$36039,
      101,
      tmpCalleeParam$36040,
      tmpCalleeParam$36041,
      tmpCalleeParam$36042,
      tmpCalleeParam$36043,
      102,
      SSA_SNe$596[1],
    ),
  );
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20, 30, 40 ];
const b = $( a );
if (tmpIfTest$32854) {
  const c = $( 1 );
  const d = $( 2 );
  const e = b[ 4 ];
  const f = b[ 2 ];
  const g = b[ 3 ];
  const h = b[ 1 ];
  const i = $( 100, c, 101, d, e, f, g, 102, h );
  $( i );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if (tmpIfTest$32854) {
    let tmpReturnArg$21651 = undefined;
    const tmpCalleeParam$36039 = $(1);
    const tmpCalleeParam$36040 = $(2);
    const tmpCalleeParam$36041 = SSA_SNe$596[4];
    const tmpCalleeParam$36042 = SSA_SNe$596[2];
    const tmpCalleeParam$36043 = SSA_SNe$596[3];
    const tmpCalleeParam$36044 = SSA_SNe$596[1];
    tmpReturnArg$21651 = $(
      100,
      tmpCalleeParam$36039,
      101,
      tmpCalleeParam$36040,
      tmpCalleeParam$36041,
      tmpCalleeParam$36042,
      tmpCalleeParam$36043,
      102,
      tmpCalleeParam$36044,
    );
    return tmpReturnArg$21651;
  } else {
    return undefined;
  }
};
let tmpCalleeParam = [10, 20, 30, 40];
const SSA_SNe$596 = $(tmpCalleeParam);
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

tmpIfTest$32854


## Runtime Outcome


Should call `$` with:
 - 1: [10, 20, 30, 40]
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
