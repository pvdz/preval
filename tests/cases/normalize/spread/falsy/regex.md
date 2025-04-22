# Preval test case

# regex.md

> Normalize > Spread > Falsy > Regex
>
> Spreading a falsy is an error unless it's a string, in that case it's a noop

## Input

`````js filename=intro
const x = $(/foo/g);
if (x) {
  $('truthy', ...x);
} else {
  $('falsy', ...x);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:regex*/ = new $regex_constructor(`foo`, `g`);
const x /*:unknown*/ = $(tmpCalleeParam);
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
const x = $(new $regex_constructor(`foo`, `g`));
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
const a = new $regex_constructor( "foo", "g" );
const b = $( a );
if (b) {
  $( "truthy", ...b );
}
else {
  const c = b === "";
  if (c) {
    $( "falsy" );
  }
  else {
    throw "Preval: Attempting to spread a falsy primitive that is not an empty string";
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
