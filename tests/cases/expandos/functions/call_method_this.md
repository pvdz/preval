# Preval test case

# call_method_this.md

> Expandos > Functions > Call method this
>
> Basic expando stuff

## Input

`````js filename=intro
function f() {
  $(1);
}
f.foo = function(){ $('pass', this); };
$(f.foo());
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(1);
  return undefined;
};
const tmpAssignMemRhs /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  $(`pass`, tmpPrevalAliasThis);
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
  $(`pass`, this);
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
  const c = this;
  debugger;
  $( "pass", c );
  return undefined;
};
a.foo = b;
const d = a.foo;
const e = $dotCall( d, a, "foo" );
$( e );
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
  const tmpPrevalAliasThis = this;
  debugger;
  $(`pass`, tmpPrevalAliasThis);
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
 - 1: 'pass', '<function>'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
