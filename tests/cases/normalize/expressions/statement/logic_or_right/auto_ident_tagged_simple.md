# Preval test case

# auto_ident_tagged_simple.md

> Normalize > Expressions > Statement > Logic or right > Auto ident tagged simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = $`fo${1}o`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`fo`, `o`];
const a /*:unknown*/ = $(tmpCalleeParam, 1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($([`fo`, `o`], 1));
`````

## Pre Normal


`````js filename=intro
let a = $([`fo`, `o`], 1);
$(a);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [`fo`, `o`];
let a = $(tmpCalleeParam, 1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "fo", "o" ];
const b = $( a, 1 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['fo', 'o'], 1
 - 2: ['fo', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
