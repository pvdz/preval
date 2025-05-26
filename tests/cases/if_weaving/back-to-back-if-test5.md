# Preval test case

# back-to-back-if-test5.md

> If weaving > Back-to-back-if-test5
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
const tmpUnaryArg = $(false);
let x = !tmpUnaryArg;
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = true;
}
if (x) {      // <-- always true
  $(`d`);
} else {
  $(`c`);
}
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(false);
let tmpClusterSSA_x /*:boolean*/ /*ternaryConst*/ = !tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  tmpClusterSSA_x = true;
} else {
  $(`a`);
}
if (tmpClusterSSA_x) {
  $(`d`);
} else {
  $(`c`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(false);
let tmpClusterSSA_x = !tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  tmpClusterSSA_x = true;
} else {
  $(`a`);
}
if (tmpClusterSSA_x) {
  $(`d`);
} else {
  $(`c`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
let b = !a;
if (a) {
  $( "b" );
  b = true;
}
else {
  $( "a" );
}
if (b) {
  $( "d" );
}
else {
  $( "c" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $(false);
let x = !tmpUnaryArg;
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'a'
 - 3: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
