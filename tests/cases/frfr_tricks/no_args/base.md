# Preval test case

# base.md

> Frfr tricks > No args > Base
>
> $frfr with no args can be resolved

## Input

`````js filename=intro
const f = function $free() {
  const one = 100 + '5';
  const two = one.slice(1);
  return two;
}

const r = $frfr(f);
const t = r.repeat(2)
$(t);
`````

## Settled


`````js filename=intro
const t /*:string*/ = `005`.repeat(2);
$(t);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`005`.repeat(2));
`````

## Pre Normal


`````js filename=intro
const f = function $free() {
  debugger;
  const one = 100 + `5`;
  const two = one.slice(1);
  return two;
};
const r = $frfr(f);
const t = r.repeat(2);
$(t);
`````

## Normalized


`````js filename=intro
const f = function $free() {
  debugger;
  const one = `1005`;
  const two = one.slice(1);
  return two;
};
const r = $frfr(f);
const t = r.repeat(2);
$(t);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "005".repeat( 2 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '005005'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- free with zero args, we can eliminate this?
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $string_repeat
