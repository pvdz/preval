# Preval test case

# toobig.md

> Math > Toobig
>
> Test difference at the LSB of a large number

## Input

`````js filename=intro
const a = $("9007199254740992"); // 2^53
const b = $("9007199254740993"); // 2^53 + 1
$(a === b); // Should be false, but both are 9007199254740992 in JS
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`9007199254740992`);
const b /*:unknown*/ = $(`9007199254740993`);
const tmpCalleeParam /*:boolean*/ = a === b;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`9007199254740992`);
$(a === $(`9007199254740993`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "9007199254740992" );
const b = $( "9007199254740993" );
const c = a === b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`9007199254740992`);
const b = $(`9007199254740993`);
let tmpCalleeParam = a === b;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '9007199254740992'
 - 2: '9007199254740993'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
