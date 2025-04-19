# Preval test case

# destruct_keys_computed.md

> Normalize > Pattern > Destruct keys computed
>
> Thanks, obfuscation. This caused a TODO crash.

## Input

`````js filename=intro
const a = $('a');
const b = $('b');
const x = {ab: 3};
let {
  [a + b]: c, // this means `var c = x[a+b]`
} = x;
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const b /*:unknown*/ = $(`b`);
const tmpCK /*:primitive*/ = a + b;
const x /*:object*/ = { ab: 3 };
const c /*:unknown*/ = x[tmpCK];
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCK = $(`a`) + $(`b`);
$({ ab: 3 }[tmpCK]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = a + b;
const d = { ab: 3 };
const e = d[ c ];
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
