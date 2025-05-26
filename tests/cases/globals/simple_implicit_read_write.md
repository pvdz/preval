# Preval test case

# simple_implicit_read_write.md

> Globals > Simple implicit read write
>
> Writing to an implicit global

This exposed a problem with free functions where the fresh free function would create
a local var with the same name as the global, leading to the global being renamed. oops.

## Options

Shrug

- skipEval
- globals: a

## Input

`````js filename=intro
$(a);
$(a = 5);
`````


## Settled


`````js filename=intro
$(a);
a = 5;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(a);
a = 5;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
$( a );
a = 5;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(a);
a = 5;
let tmpCalleeParam = a;
$(a);
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
