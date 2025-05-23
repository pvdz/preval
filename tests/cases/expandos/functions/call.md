# Preval test case

# call.md

> Expandos > Functions > Call
>
> Basic expando stuff

## Input

`````js filename=intro
function f() {
  $(1);
}
f.foo = function(){ $('pass'); };
$(f.foo());
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(1);
  return undefined;
};
const tmpAssignMemRhs /*:()=>undefined*/ = function () {
  debugger;
  $(`pass`);
  return undefined;
};
f.foo = tmpAssignMemRhs;
const tmpMCF /*:unknown*/ = f.foo;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, f, `foo`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(1);
};
f.foo = function () {
  $(`pass`);
};
$(f.foo());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 1 );
  return undefined;
};
const b = function() {
  debugger;
  $( "pass" );
  return undefined;
};
a.foo = b;
const c = a.foo;
const d = $dotCall( c, a, "foo" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
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
