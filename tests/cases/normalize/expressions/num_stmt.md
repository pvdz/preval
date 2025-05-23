# Preval test case

# num_stmt.md

> Normalize > Expressions > Num stmt
>
> A statement that is a num coercion

## Input

`````js filename=intro
+$spy();
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $spy();
+tmpUnaryArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $spy();
+tmpUnaryArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
+a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $spy();
+tmpUnaryArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
