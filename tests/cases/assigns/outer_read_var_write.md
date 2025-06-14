# Preval test case

# outer_read_var_write.md

> Assigns > Outer read var write
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
$(x);
{
  var x;
  $(1);
  x = $(2); // Ideally the first read would become undefined and then this becomes a constant
  $(x, 'b');
}
`````


## Settled


`````js filename=intro
$(undefined);
$(1);
const x /*:unknown*/ = $(2);
$(x, `b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(1);
$($(2), `b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 1 );
const a = $( 2 );
$( a, "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
$(undefined);
$(1);
x = $(2);
$(x, `b`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 1
 - 3: 2
 - 4: 2, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
