# Preval test case

# undefined.md

> Normalize > Spread > Falsy > Undefined
>
> Spreading a falsy is an error unless it's a string, in that case it's a noop

## Input

`````js filename=intro
const x = $(undefined);
if (x) {
  $('truthy', ...x);
} else {
  $('falsy', ...x);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(undefined);
if (x) {
  $(`truthy`, ...x);
} else {
  const tmpIfTest /*:boolean*/ = x === ``;
  if (tmpIfTest) {
    $(`falsy`);
  } else {
    throw `Preval: Attempting to spread a falsy primitive that is not an empty string`;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(undefined);
if (x) {
  $(`truthy`, ...x);
} else {
  if (x === ``) {
    $(`falsy`);
  } else {
    throw `Preval: Attempting to spread a falsy primitive that is not an empty string`;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( undefined );
if (a) {
  $( "truthy", ...a );
}
else {
  const b = a === "";
  if (b) {
    $( "falsy" );
  }
  else {
    throw "Preval: Attempting to spread a falsy primitive that is not an empty string";
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(undefined);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
