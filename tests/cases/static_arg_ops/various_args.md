# Preval test case

# various_args.md

> Static arg ops > Various args
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
const f = function ($$0) {
  const a = $$0;
  debugger;
  y = ~a;
  const r = $(100);
  return r;
};
let y = undefined;
const a = f(1);
$(a);
const b = f(2);
$(b);
const c = f(`a`);
$(c);
const d = f(true);
$(d);
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(100);
$(a);
const b /*:unknown*/ = $(100);
$(b);
const c /*:unknown*/ = $(100);
$(c);
const d /*:unknown*/ = $(100);
$(d);
$(-2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$($(100));
$($(100));
$($(100));
$(-2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $( 100 );
$( b );
const c = $( 100 );
$( c );
const d = $( 100 );
$( d );
$( -2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const a$1 = $dlr_$$0;
  y = ~a$1;
  const r = $(100);
  return r;
};
let y = undefined;
const a = f(1);
$(a);
const b = f(2);
$(b);
const c = f(`a`);
$(c);
const d = f(true);
$(d);
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
