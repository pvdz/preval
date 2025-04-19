# Preval test case

# expando_call.md

> Tofix > expando call
>
> Basic expando stuff

existing test case

this is a regression. we used to resolve this to just calling $('pass');$(undefined)
but i suppose the trick was rather superficial...?

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
const tmpCallCompVal /*:unknown*/ = f.foo;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpCallCompVal, f, `foo`);
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
