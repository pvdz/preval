# Preval test case

# num_num.md

> Ifelse > Ternary > Num num
>
> Should de-alias a ternary-const

## Input

`````js filename=intro
let softConst = undefined;    // as a ternary-const, we can determine this to be a numstr
const b = $(1);
let alias = undefined;
if (b) {
  softConst = $(2) * 1;
  alias = [softConst];
} else {
  softConst = $(3) * 1;
  alias = [softConst];
}
if (softConst) {
  const e = $(4);
  $(e);
  $(softConst);
} else {
  $(alias.slice(0)[0]); // this is the softCount alias but it's hard to figure that out
  $(softConst);
}
`````


## Settled


`````js filename=intro
let softConst /*:number*/ /*ternaryConst*/ = 0;
const b /*:unknown*/ = $(1);
let alias /*:array*/ /*ternaryConst*/ /*truthy*/ = undefined;
if (b) {
  const tmpBinLhs /*:unknown*/ = $(2);
  softConst = tmpBinLhs * 1;
  alias = [softConst];
} else {
  const tmpBinLhs$1 /*:unknown*/ = $(3);
  softConst = tmpBinLhs$1 * 1;
  alias = [softConst];
}
if (softConst) {
  const e /*:unknown*/ = $(4);
  $(e);
  $(softConst);
} else {
  const tmpCompObj /*:array*/ /*truthy*/ = $dotCall($array_slice, alias, `slice`, 0);
  const tmpCalleeParam /*:unknown*/ = tmpCompObj[0];
  $(tmpCalleeParam);
  $(softConst);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let softConst = 0;
const b = $(1);
let alias = undefined;
if (b) {
  softConst = $(2) * 1;
  alias = [softConst];
} else {
  softConst = $(3) * 1;
  alias = [softConst];
}
if (softConst) {
  $($(4));
  $(softConst);
} else {
  $($dotCall($array_slice, alias, `slice`, 0)[0]);
  $(softConst);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = $( 1 );
let c = undefined;
if (b) {
  const d = $( 2 );
  a = d * 1;
  c = [ a ];
}
else {
  const e = $( 3 );
  a = e * 1;
  c = [ a ];
}
if (a) {
  const f = $( 4 );
  $( f );
  $( a );
}
else {
  const g = $dotCall( $array_slice, c, "slice", 0 );
  const h = g[ 0 ];
  $( h );
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
  const tmpBinLhs = $(2);
  softConst = tmpBinLhs * 1;
  alias = [softConst];
} else {
  const tmpBinLhs$1 = $(3);
  softConst = tmpBinLhs$1 * 1;
  alias = [softConst];
}
if (softConst) {
  const e = $(4);
  $(e);
  $(softConst);
} else {
  const tmpMCF = alias.slice;
  const tmpCompObj = $dotCall(tmpMCF, alias, `slice`, 0);
  let tmpCalleeParam = tmpCompObj[0];
  $(tmpCalleeParam);
  $(softConst);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_slice


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
