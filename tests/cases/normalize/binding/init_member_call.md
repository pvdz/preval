# Preval test case

# init_member_call.md

> Normalize > Binding > Init member call
>
> Binding declaration with a member expression call init should not be outlined

## Input

`````js filename=intro
let x = "foo".toString();
$(x);
`````


## Settled


`````js filename=intro
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_toString;
let x = `foo`;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
