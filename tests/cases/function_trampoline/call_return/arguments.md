# Preval test case

# arguments.md

> Function trampoline > Call return > Arguments
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  const r = $(arguments);
  return r;
};
const q = f(1, 2, 3, 4, 5); // The use of `arguments` should prevent inlining this call, for now
$(q);
`````


## Settled


`````js filename=intro
const f /*:(unused, unused, unused, unused, unused)=>unknown*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  const r /*:unknown*/ = $(tmpPrevalAliasArgumentsAny);
  return r;
};
const q /*:unknown*/ = f(1, 2, 3, 4, 5);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const r = $(arguments);
  return r;
};
$(f(1, 2, 3, 4, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3,$$4 ) {
  const b = c;
  debugger;
  const d = $( b );
  return d;
};
const e = a( 1, 2, 3, 4, 5 );
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' }
 - 2: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
