# Preval test case

# too_many_args_no_arguments.md

> Primitive arg inlining > Too many args no arguments
>
> Calling a func with too many params while the func does not access `arguments`

In this case the excessive args can be dropped from the call expression. Their side-effects should still trigger.

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f($(1), $(2), $(3), $(4)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
$(2);
$(3);
$(4);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
$(2);
$(3);
$(4);
$(tmpCalleeParam$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( 2 );
$( 3 );
$( 4 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam$3 = $(2);
let tmpCalleeParam$5 = $(3);
let tmpCalleeParam$7 = $(4);
let tmpCalleeParam = f(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
