# Preval test case

# argumentslength.md

> Function trampoline > Call only > Argumentslength
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  $(arguments.length);
};
f(1, 2, 3, 4, 5); // The use of `arguments.length` should prevent inlining this call, for now, although inlining the arg count probably won't take very long
`````


## Settled


`````js filename=intro
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
