# Preval test case

# more_or.md

> Bit hacks > Or xor > More or
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
$(setAssignable($(100 | 16)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(116);
const b /*:number*/ /*truthy*/ /*|32*/ = tmpCalleeParam$1 | 32;
const c /*:number*/ /*&-17*/ = b & -17;
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(($(116) | 32) & -17);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 116 );
const b = a | 32;
const c = b & -17;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const setAssignable = function ($$0) {
  let a = $$0;
  debugger;
  const b = a | 48;
  const c = b ^ 16;
  return c;
};
const tmpCallCallee = setAssignable;
let tmpCalleeParam$3 = 116;
let tmpCalleeParam$1 = $(tmpCalleeParam$3);
let tmpCalleeParam = setAssignable(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 116
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
