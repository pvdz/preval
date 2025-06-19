# Preval test case

# base.md

> Function > Call > Base
>
> Function apply blabla

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
$(function(){ $(...arguments); }.call({}, ['x']));
`````


## Settled


`````js filename=intro
const tmpMCOO /*:()=>unknown*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpMCP$1 /*:array*/ /*truthy*/ = [`x`];
tmpMCOO(tmpMCP$1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(...tmpPrevalAliasArgumentsAny);
};
tmpMCOO([`x`]);
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
const d = [ "x" ];
a( d );
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
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
const tmpMCP$1 = [`x`];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, tmpMCP$1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $function_call
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['x']
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
