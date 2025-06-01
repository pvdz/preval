# Preval test case

# ai_multi_assign_last_wins.md

> Ai > Ai1 > Ai multi assign last wins
>
> Test: Multiple assignments to same var, only last one before read matters.

## Input

`````js filename=intro
// Expected: $('A'); $('B'); const $$c = $('C'); $('use', $$c);
let x = $('A');
x = $('B');
x = $('C');
$('use', x);
`````


## Settled


`````js filename=intro
$(`A`);
$(`B`);
const tmpSSA_x /*:unknown*/ = $(`C`);
$(`use`, tmpSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
$(`B`);
$(`use`, $(`C`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
$( "B" );
const a = $( "C" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`A`);
x = $(`B`);
x = $(`C`);
$(`use`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'B'
 - 3: 'C'
 - 4: 'use', 'C'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
