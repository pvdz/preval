# Preval test case

# more_or_unused2.md

> Bit hacks > Or xor > More or unused2
>
> Replace the pattern of `(x|y)^y` with `(x&(~y))`, where `y` is hopefully a literal we can resolve entirely.

Must find the or-xor pattern before merging ors, I guess. Or handle those smartly.

In this case the or should be left since there are more bits than used in the xor.

## Input

`````js filename=intro
const setAssignable = function (a) {
  const b = a | 48;
  const c = b ^ 16;
  return c;
};
$(setAssignable($(1)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const b /*:number*/ = tmpCalleeParam$1 | 32;
const c /*:number*/ = b & -17;
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(($(1) | 32) & -17);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a | 32;
const c = b & -17;
$( c );
`````


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
