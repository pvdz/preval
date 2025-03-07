# Preval test case

# shift_catch.md

> Obj mutation > Shift catch
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
try {
} catch {
  blob.thing = 'boing';
}
$('after', blob)
`````

## Settled


`````js filename=intro
const blob /*:object*/ = { thing: `woop` };
$(`after`, blob);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`, { thing: `woop` });
`````

## Pre Normal


`````js filename=intro
const blob = { thing: `woop` };
try {
} catch (e) {
  blob.thing = `boing`;
}
$(`after`, blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `woop` };
$(`after`, blob);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "woop" };
$( "after", a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'after', { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
