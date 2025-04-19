# Preval test case

# excessive_args.md

> Function > Call > Excessive args
>
> Function apply blabla

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
$(function(){ $(...arguments); }.call(({}), ['x'], 1, 2, 3));
`````


## Settled


`````js filename=intro
const tmpMCOO /*:()=>unknown*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpMCP$1 /*:array*/ = [`x`];
tmpMCOO(tmpMCP$1, 1, 2, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(...tmpPrevalAliasArgumentsAny);
};
tmpMCOO([`x`], 1, 2, 3);
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
a( d, 1, 2, 3 );
$( undefined );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['x'], 1, 2, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
