# Preval test case

# math_prec.md

> Math > Math prec
>
> Some math functions (like Math.sin, Math.cos, etc.) are notorious for returning results that are very close to, but not exactly, the mathematically correct value.

## Input

`````js filename=intro
const pi = $("3.141592653589793");
const s = $(Math.sin(pi)); // Should be 0, but is ~1.2246467991473532e-16
`````


## Settled


`````js filename=intro
const pi /*:unknown*/ = $(`3.141592653589793`);
const tmpCalleeParam /*:number*/ = $Math_sin(pi);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_sin($(`3.141592653589793`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "3.141592653589793" );
const b = $Math_sin( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const pi = $(`3.141592653589793`);
const tmpMCF = $Math_sin;
let tmpCalleeParam = $Math_sin(pi);
const s = $(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '3.141592653589793'
 - 2: 1.2246467991473532e-16
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
