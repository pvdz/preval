# Preval test case

# opaque_type_coercion.md

> Ai > Ai5 > Opaque type coercion
>
> Test that type coercion of opaque values is preserved

## Input

`````js filename=intro
const x = $("test");
const y = String(x);
const z = Number(x);
const w = Boolean(x);
$(y);
$(z);
$(w);

// Expected: Preval should preserve all type coercions
// as it cannot know what valueOf() or toString() might do
// on an opaque value during coercion
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:string*/ = $coerce(x, `string`);
const z /*:number*/ = $coerce(x, `number`);
$(y);
$(z);
const w /*:boolean*/ = $boolean_constructor(x);
$(w);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = String(x);
const z = Number(x);
$(y);
$(z);
$($boolean_constructor(x));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $coerce( a, "string" );
const c = $coerce( a, "number" );
$( b );
$( c );
const d = $boolean_constructor( a );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = $coerce(x, `string`);
const z = $coerce(x, `number`);
const w = $boolean_constructor(x);
$(y);
$(z);
$(w);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'test'
 - 3: NaN
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
