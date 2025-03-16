# Preval test case

# base_0.md

> Bit hacks > If return bit > Base 0
>
> When an if checks whether a single bit is set and then returns a literal it should be replaced with that value

## Input

`````js filename=intro
function f(a) {
  const x = a & 16;
  if (x) return 16;
  else return 0;
}
$((f($(0))));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const x$1 /*:number*/ = tmpCalleeParam$1 & 16;
$(x$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(0) & 16);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 16;
  if (x) return 16;
  else return 0;
};
$(f($(0)));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 16;
  if (x) {
    return 16;
  } else {
    return 0;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = $(0);
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = a & 16;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
