# Preval test case

# sequence_ident_computed.md

> Normalize > Member access > Assign rhs > Sequence ident computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let x = 10, b = "foo", c = 1;
x = ($(1), b)[$('length')];
$(x);
$(c);
`````


## Settled


`````js filename=intro
$(1);
const tmpAssignRhsCompProp /*:unknown*/ = $(`length`);
const x /*:unknown*/ = `foo`[tmpAssignRhsCompProp];
$(x);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAssignRhsCompProp = $(`length`);
$(`foo`[tmpAssignRhsCompProp]);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "length" );
const b = "foo"[ a ];
$( b );
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 3
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
