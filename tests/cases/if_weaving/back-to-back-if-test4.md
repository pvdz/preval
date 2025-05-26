# Preval test case

# back-to-back-if-test4.md

> If weaving > Back-to-back-if-test4
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
const tmpUnaryArg = $(true);
const x = !tmpUnaryArg;
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
const tmpUnaryArg /*:unknown*/ = $(true);
if (tmpUnaryArg) {
  $(`b`);
  throw `Preval: Cannot write to const binding \`x\``;
} else {
  $(`a`);
  $(`d`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`b`);
  throw `Preval: Cannot write to const binding \`x\``;
} else {
  $(`a`);
  $(`d`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "b" );
  throw "Preval: Cannot write to const binding `x`";
}
else {
  $( "a" );
  $( "d" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $(true);
const x = !tmpUnaryArg;
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
 - 1: true
 - 2: 'b'
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
