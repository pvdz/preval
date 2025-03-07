# Preval test case

# xorring.md

> Bit hacks > Xorring
>
> Two xors back to back

## Input

`````js filename=intro
const x = $(1234);
const y = x ^ 200;
const z = y ^ 300;
$(x, y, z);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1234);
const y /*:number*/ = x ^ 200;
const z /*:number*/ = y ^ 300;
$(x, y, z);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1234);
const y = x ^ 200;
$(x, y, y ^ 300);
`````

## Pre Normal


`````js filename=intro
const x = $(1234);
const y = x ^ 200;
const z = y ^ 300;
$(x, y, z);
`````

## Normalized


`````js filename=intro
const x = $(1234);
const y = x ^ 200;
const z = y ^ 300;
$(x, y, z);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1234 );
const b = a ^ 200;
const c = b ^ 300;
$( a, b, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1234
 - 2: 1234, 1050, 1334
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
