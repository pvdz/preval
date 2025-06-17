# Preval test case

# dotcall_base.md

> Function > Apply > Dotcall base
>
> Function apply blabla

## Input

`````js filename=intro
const f = function(){ $(...arguments); };
const apply = Function.prototype.apply;
$($dotCall(apply, f, 'prop-unused', undefined, ['x'])); // should print x
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
f(`x`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(...tmpPrevalAliasArgumentsAny);
};
f(`x`);
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
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpCompObj = $Function_prototype;
const apply = tmpCompObj.apply;
let tmpCalleeParam$1 = [`x`];
let tmpCalleeParam = $dotCall(apply, f, `prop-unused`, undefined, tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


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
