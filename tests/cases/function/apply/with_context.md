# Preval test case

# with_context.md

> Function > Apply > With context
>
> Function apply blabla

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
// Show that it keeps the apply when context is used (unless/until we can eliminate that too heh)
$(function(){ $(this.x); }.apply({x: 15}, ['x']));
`````


## Settled


`````js filename=intro
const tmpMCOO /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasThis.x;
  $(tmpCalleeParam$1);
  return undefined;
};
const tmpMCP /*:object*/ = { x: 15 };
const tmpMCP$1 /*:array*/ = [`x`];
const tmpCalleeParam /*:unknown*/ = $dotCall($function_apply, tmpMCOO, `apply`, tmpMCP, tmpMCP$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis.x);
};
const tmpMCP = { x: 15 };
$($dotCall($function_apply, tmpMCOO, `apply`, tmpMCP, [`x`]));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b.x;
  $( c );
  return undefined;
};
const d = { x: 15 };
const e = [ "x" ];
const f = $dotCall( $function_apply, a, "apply", d, e );
$( f );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_apply
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 15
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
