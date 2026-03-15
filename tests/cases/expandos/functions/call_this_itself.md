# Preval test case

# call_this_itself.md

> Expandos > Functions > Call this itself
>
> Basic expando stuff

## Input

`````js filename=intro
function f() {
  $(1, this);
}
f.foo = function(){ $('pass'); };
$(f.foo());
`````


## Settled


`````js filename=intro
$(`pass`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  $(1, tmpPrevalAliasThis);
  return undefined;
};
const tmpAssignMemLhsObj = f;
const tmpAssignMemRhs = function () {
  debugger;
  $(`pass`);
  return undefined;
};
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
const tmpMCF = f.foo;
let tmpCalleeParam = $dotCall(tmpMCF, f, `foo`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
