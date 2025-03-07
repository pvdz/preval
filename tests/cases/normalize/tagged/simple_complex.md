# Preval test case

# simple_complex.md

> Normalize > Tagged > Simple complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$`abc ${ 10 } ${ $(20) } def`;
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(20);
const tmpCalleeParam /*:array*/ = [`abc `, ` `, ` def`];
$(tmpCalleeParam, 10, tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(20);
$([`abc `, ` `, ` def`], 10, tmpCalleeParam$1);
`````

## Pre Normal


`````js filename=intro
$([`abc `, ` `, ` def`], 10, $(20));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [`abc `, ` `, ` def`];
const tmpCalleeParam$1 = $(20);
$(tmpCalleeParam, 10, tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 20 );
const b = [ "abc ", " ", " def" ];
$( b, 10, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 20
 - 2: ['abc ', ' ', ' def'], 10, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
