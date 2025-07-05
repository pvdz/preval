# Preval test case

# arguments.md

> Function trampoline > Call only > Arguments
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Options

- expectBad

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  $(arguments);
};
f(1, 2, 3, 4, 5); // The use of `arguments` should prevent inlining this call, for now
`````


## Settled


`````js filename=intro
const tmpPrevalAliasArgumentsAny /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
$(tmpPrevalAliasArgumentsAny);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3, 4, 5]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4, 5 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  $(tmpPrevalAliasArgumentsAny);
  return undefined;
};
f(1, 2, 3, 4, 5);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!! (expected)
 - !1: [1, 2, 3, 4, 5]
 -  eval returned: undefined

Denormalized calls: BAD!! (expected)
 - !1: [1, 2, 3, 4, 5]
 -  eval returned: undefined
