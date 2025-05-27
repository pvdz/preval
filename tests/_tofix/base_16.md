# Preval test case

# base_16.md

> Tofix > base 16
>
> When an if checks whether a single bit is set and then returns a literal it should be replaced with that value

existing test case
we used to be able to optimize this to
-const tmpCalleeParam /*:number*/ = tmpCalleeParam$1 & 16;
-$(tmpCalleeParam);

but maybe i like this better?

## Input

`````js filename=intro
function f(a) {
  const x = a & 16;
  if (x) return 16;
  else return 0;
}
$((f($(16))));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(16);
const x /*:number*/ = tmpCalleeParam$1 & 16;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(16) & 16);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 16 );
const b = a & 16;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 16;
  if (x) {
    return 16;
  } else {
    return 0;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = $(16);
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 16
 - 2: 16
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
