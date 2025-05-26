# Preval test case

# excessive_args.md

> Function > Apply > Excessive args
>
> Function apply blabla

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
$(function(){ $(...arguments); }.apply(({}), (['x']), 1, 2, 3));
`````


## Settled


`````js filename=intro
const tmpMCOO /*:()=>unknown*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
tmpMCOO(`x`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(...tmpPrevalAliasArgumentsAny);
};
tmpMCOO(`x`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  $( ...b );
  return undefined;
};
a( "x" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpMCF = tmpMCOO.apply;
const tmpMCP = {};
const tmpMCP$1 = [`x`];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `apply`, tmpMCP, tmpMCP$1, 1, 2, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_apply
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
