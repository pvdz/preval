# Preval test case

# arr_arr.md

> Tofix > arr arr
>
> Should de-alias a ternary-const

existing test case

This case is interesting because the alias is assigned an identical
shape array but with unknown contents. It does however know that in
both (all) cases it is an array.
It could detect that the array always have one element (or the nth)
defined, which is relevant for the alias[0] lookup.
But before that, it can realize that the slice is redundant when the
array is only read from after that, without a way to be mutated.
So the slice is moot can be dropped. After that, knowing that the
shape of the array is equal we would have to confirm that softConst
is indeed a const or ternary const, and reachable from the point of
slicing.
Then, we can replace the alias.slice(0)[0] with just softConst and
the alias var just shakes out.

- when slicing
  - check if slice is const/ternaryconst
  - check if result is only indexed (etc?)
  - check if result is not mutated between slice and all reads
  - check if original array is not mutated between slice and all reads
  - (same inner)
- in that case remove the slice

- when reading array index
  - same inner
  - check if array shape is known
  - check if array is not mutated between declaration and reading
  - check if value is reachable
- in that case read can be inlined

## Input

`````js filename=intro
let softConst = undefined;
const b = $(1);
let alias = undefined;
if (b) {
  softConst = $(2);
  alias = [softConst];
} else {
  softConst = $(3);
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
let softConst /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:unknown*/ = $(1);
let alias /*:array*/ /*ternaryConst*/ = undefined;
if (b) {
  softConst = $(2);
  alias = [softConst];
} else {
  softConst = $(3);
  alias = [softConst];
}
if (softConst) {
  const e /*:unknown*/ = $(4);
  $(e);
  $(softConst);
} else {
  const tmpCompObj /*:array*/ = $dotCall($array_slice, alias, `slice`, 0);
  const tmpCalleeParam /*:unknown*/ = tmpCompObj[0];
  $(tmpCalleeParam);
  $(softConst);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let softConst = undefined;
const b = $(1);
let alias = undefined;
if (b) {
  softConst = $(2);
  alias = [softConst];
} else {
  softConst = $(3);
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
let a = undefined;
const b = $( 1 );
let c = undefined;
if (b) {
  a = $( 2 );
  c = [ a ];
}
else {
  a = $( 3 );
  c = [ a ];
}
if (a) {
  const d = $( 4 );
  $( d );
  $( a );
}
else {
  const e = $dotCall( $array_slice, c, "slice", 0 );
  const f = e[ 0 ];
  $( f );
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
  alias = [softConst];
} else {
  softConst = $(3);
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
