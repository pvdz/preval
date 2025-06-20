# Preval test case

# back-to-back-if-test.md

> If weaving > Back-to-back-if-test
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
x = !tmpUnaryArg;
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
x = !tmpUnaryArg;
x = !tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  x = true;
} else {
  $(`a`);
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = !tmpUnaryArg;
x = !tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  x = true;
} else {
  $(`a`);
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
x = !tmpUnaryArg;
x = !tmpUnaryArg;
if (tmpUnaryArg) {
  $( "b" );
  x = true;
}
else {
  $( "a" );
}
if (x) {
  $( "d" );
}
else {
  $( "c" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
x = !tmpUnaryArg;
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


BAD@! Found 2 implicit global bindings:

tmpUnaryArg, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
