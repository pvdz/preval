# Preval test case

# complex_computed_property_complex_args.md

> Normalize > Call > Complex computed property complex args
>
> Calls should have simple objects

## Input

`````js filename=intro
function b() { return $('b'); }
const a = {b: $};
$(a)[b()]($(1), $(2));
`````


## Settled


`````js filename=intro
const a /*:object*/ = { b: $ };
const tmpCallCompObj /*:unknown*/ = $(a);
const tmpCallCompProp /*:unknown*/ = $(`b`);
const tmpCallCompVal /*:unknown*/ = tmpCallCompObj[tmpCallCompProp];
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
$dotCall(tmpCallCompVal, tmpCallCompObj, undefined, tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompObj = $({ b: $ });
const tmpCallCompProp = $(`b`);
tmpCallCompObj[tmpCallCompProp]($(1), $(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = $( "b" );
const d = b[ c ];
const e = $( 1 );
const f = $( 2 );
$dotCall( d, b, undefined, e, f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 'b'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
