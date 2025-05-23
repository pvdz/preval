# Preval test case

# back-to-back-if-test3.md

> If weaving > Back-to-back-if-test3
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
let x = !$();
if (x) {
  x = true;
  $(`a`);
} else {
  x = false;
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
if (tmpUnaryArg) {
  $(`b`);
  $(`d`);
} else {
  $(`a`);
  $(`d`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(`b`);
  $(`d`);
} else {
  $(`a`);
  $(`d`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( "b" );
  $( "d" );
}
else {
  $( "a" );
  $( "d" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $();
let x = !tmpUnaryArg;
if (x) {
  x = true;
  $(`a`);
} else {
  x = false;
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
