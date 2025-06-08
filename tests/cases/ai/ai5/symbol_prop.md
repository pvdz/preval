# Preval test case

# symbol_prop.md

> Ai > Ai5 > Symbol prop
>
> Test normalization of symbol property access

## Input

`````js filename=intro
const sym = Symbol("key");
const obj = { [sym]: 1 };
const x = obj[sym];
$(x);

// Expected:
// const sym = Symbol("key");
// const obj = { [sym]: 1 };
// const x = obj[sym];
// $(x);
`````


## Settled


`````js filename=intro
const sym /*:unknown*/ = Symbol(`key`);
const obj /*:object*/ /*truthy*/ = { [sym]: 1 };
const x /*:unknown*/ = obj[sym];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const sym = Symbol(`key`);
$({ [sym]: 1 }[sym]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Symbol( "key" );
const b = { [ a ]: 1 };
const c = b[ a ];
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const sym = Symbol(`key`);
const obj = { [sym]: 1 };
const x = obj[sym];
$(x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
