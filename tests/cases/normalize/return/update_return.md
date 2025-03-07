# Preval test case

# update_return.md

> Normalize > Return > Update return
>
> The branch updates the value that is finally returned. Does it combine them after inlining the return into the branches?

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = 10;
  }
  return x;
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(10);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  if ($(1)) {
    x = 10;
  }
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = 10;
    return x;
  } else {
    return x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 10 );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
