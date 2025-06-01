# Preval test case

# ai_void_operand_side_effect.md

> Ai > Ai1 > Ai void operand side effect
>
> Test: void operator on an expression with side effects.

## Input

`````js filename=intro
// Expected: $('A'); const $$b = $('B'); let x = $$b; $('use', x);
let x = $('A');
void (x = $('B'));
$('use', x);
`````


## Settled


`````js filename=intro
$(`A`);
const x /*:unknown*/ = $(`B`);
$(`use`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
$(`use`, $(`B`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
const a = $( "B" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`A`);
x = $(`B`);
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
 - 3: 'use', 'B'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
