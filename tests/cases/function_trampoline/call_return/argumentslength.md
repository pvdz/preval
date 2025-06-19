# Preval test case

# argumentslength.md

> Function trampoline > Call return > Argumentslength
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  const r = $(arguments.length);
  return r;
};
const q = f(1, 2, 3, 4, 5); // The use of `arguments.length` should prevent inlining this call, for now, although inlining the arg count probably won't take very long
$(q);
`````


## Settled


`````js filename=intro
const r /*:unknown*/ = $(5);
$(r);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpPrevalAliasArgumentsLen);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
