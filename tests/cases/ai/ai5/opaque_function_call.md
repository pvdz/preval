# Preval test case

# opaque_function_call.md

> Ai > Ai5 > Opaque function call
>
> Test that function calls with opaque values are preserved

## Input

`````js filename=intro
const x = $("test");
const y = x();
const z = x.call(null);
const w = x.apply(null, []);
$(y);
$(z);
$(w);

// Expected: Preval should preserve all function calls
// as it cannot know if the opaque value is callable
// or what it might do when called
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:unknown*/ = x();
const tmpMCF /*:unknown*/ = x.call;
const z /*:unknown*/ = $dotCall(tmpMCF, x, `call`, null);
const tmpMCF$1 /*:unknown*/ = x.apply;
const tmpMCP /*:array*/ /*truthy*/ = [];
const w /*:unknown*/ = $dotCall(tmpMCF$1, x, `apply`, null, tmpMCP);
$(y);
$(z);
$(w);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = x();
const z = x.call(null);
const w = x.apply(null, []);
$(y);
$(z);
$(w);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a();
const c = a.call;
const d = $dotCall( c, a, "call", null );
const e = a.apply;
const f = [];
const g = $dotCall( e, a, "apply", null, f );
$( b );
$( d );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = x();
const tmpMCF = x.call;
const z = $dotCall(tmpMCF, x, `call`, null);
const tmpMCF$1 = x.apply;
const tmpMCP = [];
const w = $dotCall(tmpMCF$1, x, `apply`, null, tmpMCP);
$(y);
$(z);
$(w);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
