# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = this)]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [undefined]: 10 };
$(tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [undefined]: 10 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ undefined ]: 10 };
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { undefined: '10' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
