# Preval test case

# function_ctx.md

> Dot call > Function ctx
>
>

## Input

`````js filename=intro
const x = $dotCall(Function, {eliminate:'me'}, undefined, 'return "pass";');
$(x());
`````


## Settled


`````js filename=intro
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = { eliminate: `me` };
const x = function () {
  debugger;
  return `pass`;
};
let tmpCalleeParam = x();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
