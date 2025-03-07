# Preval test case

# null.md

> Normalize > Spread > Falsy > Null
>
> Spreading a falsy is an error unless it's a string, in that case it's a noop

## Input

`````js filename=intro
const x = $(null);
if (x) {
  $('truthy', ...x);
} else {
  $('falsy', ...x);
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(null);
if (x) {
  $(`truthy`, ...x);
} else {
  const tmpIfTest /*:boolean*/ = x === ``;
  if (tmpIfTest) {
    $(`falsy`);
  } else {
    throw `Preval: Attempting to spread primitive that is not an empty string`;
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(null);
if (x) {
  $(`truthy`, ...x);
} else {
  if (x === ``) {
    $(`falsy`);
  } else {
    throw `Preval: Attempting to spread primitive that is not an empty string`;
  }
}
`````

## Pre Normal


`````js filename=intro
const x = $(null);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Normalized


`````js filename=intro
const x = $(null);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
if (a) {
  $( "truthy", ...a );
}
else {
  const b = a === "";
  if (b) {
    $( "falsy" );
  }
  else {
    throw "Preval: Attempting to spread primitive that is not an empty string";
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: null
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
