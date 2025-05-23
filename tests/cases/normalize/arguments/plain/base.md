# Preval test case

# base.md

> Normalize > Arguments > Plain > Base
>
> Base case for the special `arguments` builtin

## Input

`````js filename=intro
function f(a) {
  $(arguments[0]);
}
f();
`````


## Settled


`````js filename=intro
const f /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  $(tmpCalleeParam);
  return undefined;
};
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(tmpPrevalAliasArgumentsAny[0]);
};
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = b[ 0 ];
  $( d );
  return undefined;
};
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasArgumentsAny[0];
  $(tmpCalleeParam);
  return undefined;
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
