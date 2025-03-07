# Preval test case

# let.md

> Recursive funcs > Let
>
>

## Input

`````js filename=intro
let f = function() {
  $(f());
}
f = function() {
  $(f());
}
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  f();
  $(undefined);
  return undefined;
};
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  f();
  $(undefined);
};
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(f());
};
f = function () {
  debugger;
  $(f());
};
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
  return undefined;
};
f = function () {
  debugger;
  const tmpCalleeParam$1 = f();
  $(tmpCalleeParam$1);
  return undefined;
};
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  a();
  $( undefined );
  return undefined;
};
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
