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
const blob /*:object*/ /*truthy*/ = { thing: `woop` };
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`, { thing: `woop` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "woop" };
$( "after", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const blob = { thing: `woop` };
$(`after`, blob);
`````


## Todos triggered


None


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
