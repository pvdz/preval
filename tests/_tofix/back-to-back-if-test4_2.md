# Preval test case

# back-to-back-if-test4_2.md

> If weaving > Back-to-back-if-test4 2

The const case had interesting output.
One problem here is that the if-test becomes tmpUnaryArg which makes it harder
to see that x=true. It misses the heuristic now. In the (current) settled output,
x is gone completely so this logic can no longer be traced at all. Otoh x is a const
so it makes sense.
Even in this case, x is always truthy so Preval should do better.

## Options

- globals: tmpUnaryArg

## Input

`````js filename=intro
// const tmpUnaryArg = $(true);
const x = !tmpUnaryArg;             // <--
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);                           // <-- unreachable because x is always true, regardless
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_x /*:unknown*/ = tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  throw `Preval: Cannot write to const binding \`x\``;
} else {
  $(`a`);
  if (tmpClusterSSA_x) {
    $(`c`);
  } else {
    $(`d`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_x = tmpUnaryArg;
if (tmpUnaryArg) {
  $(`b`);
  throw `Preval: Cannot write to const binding \`x\``;
} else {
  $(`a`);
  if (tmpClusterSSA_x) {
    $(`c`);
  } else {
    $(`d`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = tmpUnaryArg;
if (tmpUnaryArg) {
  $( "b" );
  throw "Preval: Cannot write to const binding `x`";
}
else {
  $( "a" );
  if (a) {
    $( "c" );
  }
  else {
    $( "d" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


- (todo) when is a constant an implicit global too?


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
