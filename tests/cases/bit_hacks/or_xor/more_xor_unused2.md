# Preval test case

# more_xor_unused2.md

> Bit hacks > Or xor > More xor unused2
>
> Replace the pattern of `(x|y)^y` with `(x&(~y))`, where `y` is hopefully a literal we can resolve entirely.

Must find the or-xor pattern before merging ors, I guess. Or handle those smartly.

In this case the xor should be left since there are more bits than used in the or.

## Input

`````js filename=intro
const setAssignable = function (a) {
  const b = a | 16;
  const c = b ^ 48;
  return c;
};
$(setAssignable($(1)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
tmpCalleeParam$1 ** 0;
const tmpOrXor /*:number*/ /*&-17*/ = tmpCalleeParam$1 & -17;
const c /*:number*/ /*^32*/ = tmpOrXor ^ 32;
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
tmpCalleeParam$1 ** 0;
$((tmpCalleeParam$1 & -17) ^ 32);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
a ** 0;
const b = a & -17;
const c = b ^ 32;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const setAssignable = function ($$0) {
  let a = $$0;
  debugger;
  const b = a | 16;
  const c = b ^ 48;
  return c;
};
const tmpCallCallee = setAssignable;
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam = setAssignable(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 33
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
