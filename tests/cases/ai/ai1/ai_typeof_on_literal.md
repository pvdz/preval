# Preval test case

# ai_typeof_on_literal.md

> Ai > Ai1 > Ai typeof on literal
>
> Test: typeof operator on a known primitive literal should be folded.

## Input

`````js filename=intro
// Expected: let ts = "string"; let tn = "number"; let tb = "boolean"; $('types', ts, tn, tb);
let ts = typeof 'hello';
let tn = typeof 123;
let tb = typeof false;
$('types', ts, tn, tb);
`````


## Settled


`````js filename=intro
$(`types`, `string`, `number`, `boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`types`, `string`, `number`, `boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "types", "string", "number", "boolean" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ts = `string`;
let tn = `number`;
let tb = `boolean`;
$(`types`, ts, tn, tb);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'types', 'string', 'number', 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
