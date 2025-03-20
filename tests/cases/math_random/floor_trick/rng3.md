# Preval test case

# rng3.md

> Math random > Floor trick > Rng3
>
> In this case the result is 1 2 or 3 and we can't really predict much more than that.

## Input

`````js filename=intro
const r = Math.random();
const a = r * 3;
const is_012 = Math.floor(a);
const is_123 = is_012 + 1;
$(is_123 === 1 || is_123 === 2 || is_123 === 3);
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
const r = Math.random();
const a = r * 3;
const is_012 = Math.floor(a);
const is_123 = is_012 + 1;
$(is_123 === 1 || is_123 === 2 || is_123 === 3);
`````

## Normalized


`````js filename=intro
const r = 0.12556649118791485;
const a = r * 3;
const is_012 = $Math_floor(a);
const is_123 = is_012 + 1;
let tmpCalleeParam = is_123 === 1;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = is_123 === 2;
  if (tmpCalleeParam) {
    $(tmpCalleeParam);
  } else {
    tmpCalleeParam = is_123 === 3;
    $(tmpCalleeParam);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_floor
