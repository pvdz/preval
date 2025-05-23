# Preval test case

# if_new.md

> Ifelse > Harder > If new
>
> The `new` operator is guaranteed to return an object which is always truthy

## Input

`````js filename=intro
if (new ($($))) $(2);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
new tmpNewCallee();
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
new tmpNewCallee();
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
new a();
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = $($);
const tmpIfTest = new tmpNewCallee();
if (tmpIfTest) {
  $(2);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
