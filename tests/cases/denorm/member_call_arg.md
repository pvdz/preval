# Preval test case

# member_call_arg.md

> Denorm > Member call arg
>
>

## Input

`````js filename=intro
const a = inline.value;
const b = encodeURIComponent(a); // collapse a+b
const c = $coerce(b, `plustr`);
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = inline.value;
const b /*:string*/ = encodeURIComponent(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(encodeURIComponent(inline.value));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = inline.value;
const b = encodeURIComponent( a );
$( b );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

inline


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
