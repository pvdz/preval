# Preval test case

# too_many_args_with_arguments.md

> Primitive arg inlining > Too many args with arguments
>
> Calling a func with too many params while the func accesses `arguments`

In this case the excessive args can not be dropped because they might be reflected upon through `arguments`.

## Input

`````js filename=intro
function f(a) {
  $(arguments.length);
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
$( 4 );
$( a );
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
 - 5: 4
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
