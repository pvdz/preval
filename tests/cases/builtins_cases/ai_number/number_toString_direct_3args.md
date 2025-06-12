# Preval test case

# number_toString_direct_3args.md

> Builtins cases > Ai number > Number toString direct 3args
>
> Test Number.prototype.toString called directly with 3 arguments (extra arguments ignored)

## Input

`````js filename=intro
const num = $(255);
const result = num.toString(8, 1, 2);
$(result); // Expected: "377"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(255);
const tmpMCF /*:unknown*/ = num.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toString`, 8, 1, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(255);
$(num.toString(8, 1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 255 );
const b = a.toString;
const c = $dotCall( b, a, "toString", 8, 1, 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(255);
const tmpMCF = num.toString;
const result = $dotCall(tmpMCF, num, `toString`, 8, 1, 2);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 255
 - 2: '377'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
