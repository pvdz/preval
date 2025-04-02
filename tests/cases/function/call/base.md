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
const tmpCallObj /*:()=>unknown*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpCalleeParam$3 /*:array*/ = [`x`];
tmpCallObj(tmpCalleeParam$3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallObj = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(...tmpPrevalAliasArgumentsAny);
};
tmpCallObj([`x`]);
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


## Todos triggered


None


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
