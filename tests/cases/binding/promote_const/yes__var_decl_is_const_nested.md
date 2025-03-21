# Preval test case

# yes__var_decl_is_const_nested.md

> Binding > Promote const > Yes  var decl is const nested
>
> This is a var decl that is actually a constant but the only write is nested in something else. After our normalization steps it has to be a statement.

The x should be made a constant.

## Input

`````js filename=intro
var x;
{
  $(x = $(10));
  $(x);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(10);
$(x);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(10);
$(x);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
