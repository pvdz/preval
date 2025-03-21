# Preval test case

# template_simple.md

> Normalize > Templates > Static resolve > Var decl > Template simple
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${`I am a string`}`;
$(x);
`````


## Settled


`````js filename=intro
$(`I am a string`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`I am a string`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "I am a string" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'I am a string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
