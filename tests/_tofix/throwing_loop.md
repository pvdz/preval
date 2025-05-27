# Preval test case

# throwing_loop.md

> Tofix > throwing loop
>
> One of the fake loops; a loop that always throws is not a loop

## Input

`````js filename=intro
while (true) {
  throw 'repeat after me';
}
$(1);
`````


## Settled


`````js filename=intro
throw `repeat after me`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `repeat after me`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "repeat after me";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  throw `repeat after me`;
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ repeat after me ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
