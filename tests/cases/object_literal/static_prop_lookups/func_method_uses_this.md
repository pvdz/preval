# Preval test case

# func_method_uses_this.md

> Object literal > Static prop lookups > Func method uses this
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const f = function(){ 
  $('piss'); 
  $('pass'); 
  $('poss');
  // This means we can't call `f` without the context.
  // At some point we'll be able to infer the context and eliminate it anyways.
  return this.foo;
};
const o = {
  f,
  foo: 'You got it!', // We'll get it, eventually
};
$(o.f());
`````


## Settled


`````js filename=intro
$(`piss`);
$(`pass`);
$(`poss`);
$(`You got it!`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`piss`);
$(`pass`);
$(`poss`);
$(`You got it!`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "piss" );
$( "pass" );
$( "poss" );
$( "You got it!" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'piss'
 - 2: 'pass'
 - 3: 'poss'
 - 4: 'You got it!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
