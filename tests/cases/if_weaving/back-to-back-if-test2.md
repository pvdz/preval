# Preval test case

# back-to-back-if-test2.md

> If weaving > Back-to-back-if-test2
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
let x = !$();
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


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $();
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
const tmpUnaryArg = $();
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
const a = $();
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
const tmpUnaryArg = $();
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
 - 1: 
 - 2: 'a'
 - 3: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
