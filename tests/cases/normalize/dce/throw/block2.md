# Preval test case

# block2.md

> Normalize > Dce > Throw > Block2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  {
    throw $(1, 'throw');
    $('fail');
  }
  $('fail');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpThrowArg /*:unknown*/ = $(1, `throw`);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $(1, `throw`);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "throw" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
