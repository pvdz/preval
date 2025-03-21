# Preval test case

# arguments.md

> Function trampoline > Call only > Arguments
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  $(arguments);
};
f(1, 2, 3, 4, 5); // The use of `arguments` should prevent inlining this call, for now
`````


## Settled


`````js filename=intro
const f /*:(unused, unused, unused, unused, unused)=>unknown*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  $(tmpPrevalAliasArgumentsAny);
  return undefined;
};
f(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  $(arguments);
};
f(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3,$$4 ) {
  const b = c;
  debugger;
  $( b );
  return undefined;
};
a( 1, 2, 3, 4, 5 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
