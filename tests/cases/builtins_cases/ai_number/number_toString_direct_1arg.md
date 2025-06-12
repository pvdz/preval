# Preval test case

# number_toString_direct_1arg.md

> Builtins cases > Ai number > Number toString direct 1arg
>
> Test Number.prototype.toString called directly with 1 argument (radix)

## Input

`````js filename=intro
const num = $(255);
const result = num.toString(16);
$(result); // Expected: "ff"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(255);
const tmpMCF /*:unknown*/ = num.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toString`, 16);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(255);
$(num.toString(16));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 255 );
const b = a.toString;
const c = $dotCall( b, a, "toString", 16 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(255);
const tmpMCF = num.toString;
const result = $dotCall(tmpMCF, num, `toString`, 16);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 255
 - 2: 'ff'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
