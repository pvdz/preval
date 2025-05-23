# Preval test case

# sequence_ident_computed.md

> Normalize > Member access > Statement > Global > Sequence ident computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let c = 1, b = "foo";
($(1), b)[$('length')];
$(c);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $(`length`);
`foo`[tmpCalleeParam];
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCalleeParam = $(`length`);
`foo`[tmpCalleeParam];
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "length" );
"foo"[ a ];
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = 1;
let b = `foo`;
$(1);
const tmpCompObj = b;
const tmpCalleeParam = $(`length`);
tmpCompObj[tmpCalleeParam];
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
