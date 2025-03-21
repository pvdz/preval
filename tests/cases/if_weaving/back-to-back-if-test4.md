# Preval test case

# back-to-back-if-test4.md

> If weaving > Back-to-back-if-test4
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
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
if (tmpUnaryArg) {
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
if (tmpUnaryArg) {
  $( "b" );
  throw "Preval: Cannot write to const binding `x`";
}
else {
  $( "a" );
  $( "d" );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

tmpUnaryArg


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
