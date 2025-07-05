# Preval test case

# crap_code.md

> Function > Constructor > Crap code
>
> Should not crash preval

## Options

This will fail either way

- skipEval

## Input

`````js filename=intro
$(Function('x x')());
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $InvalidFunction(`x x`);
const tmpCalleeParam /*:unknown*/ = tmpCallComplexCallee();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $InvalidFunction(`x x`);
$(tmpCallComplexCallee());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $InvalidFunction( "x x" );
const b = a();
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = $InvalidFunction(`x x`);
let tmpCalleeParam = tmpCallComplexCallee();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

$InvalidFunction


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
