# Preval test case

# unconditional_exact_match_noop.md

> Bit hacks > Or xor > Unconditional exact match noop
>
> Replace the pattern of `(x|y)^y` with `(x&(~y))`, where `y` is hopefully a literal we can resolve entirely.

Must find the or-xor pattern before merging ors, I guess. Or handle those smartly.

## Input

`````js filename=intro
const setAssignable = function (a) {
  const b = a | 16;
  const c = b ^ 16;
  return c;
};
$(setAssignable($(100)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(100);
tmpCalleeParam$1 ** 0;
const c /*:number*/ /*&-17*/ = tmpCalleeParam$1 & -17;
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(100);
tmpCalleeParam$1 ** 0;
$(tmpCalleeParam$1 & -17);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
a ** 0;
const b = a & -17;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const setAssignable = function ($$0) {
  let a = $$0;
  debugger;
  const b = a | 16;
  const c = b ^ 16;
  return c;
};
const tmpCallCallee = setAssignable;
let tmpCalleeParam$1 = $(100);
let tmpCalleeParam = setAssignable(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
