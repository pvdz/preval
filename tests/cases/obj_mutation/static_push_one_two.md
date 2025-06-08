# Preval test case

# static_push_one_two.md

> Obj mutation > Static push one two
>
> Testing the inlining of objlit mutations

In this particular case the array could be initialized with the numbers immediately.

## Input

`````js filename=intro
const blob = {thing: 'woop'};
blob.thing = 'boing';
blob.thing = 'boom';
$(blob);
`````


## Settled


`````js filename=intro
const blob /*:object*/ /*truthy*/ = { thing: `boom` };
$(blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ thing: `boom` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "boom" };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const blob = { thing: `boom` };
$(blob);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { thing: '"boom"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
