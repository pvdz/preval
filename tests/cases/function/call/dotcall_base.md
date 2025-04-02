# Preval test case

# dotcall_base.md

> Function > Call > Dotcall base
>
> Function apply blabla

## Input

`````js filename=intro
const f = function(){ $(...arguments); };
const call = Function.prototype.call;
$($dotCall(call, f, 'prop-unused', undefined, 'x')); // should print x
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const call /*:unknown*/ = $Function_prototype.call;
const tmpCalleeParam /*:unknown*/ = $dotCall(call, f, `prop-unused`, undefined, `x`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(...tmpPrevalAliasArgumentsAny);
};
$($dotCall($Function_prototype.call, f, `prop-unused`, undefined, `x`));
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
const d = $Function_prototype.call;
const e = $dotCall( d, a, "prop-unused", undefined, "x" );
$( e );
`````


## Todos triggered


None


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
