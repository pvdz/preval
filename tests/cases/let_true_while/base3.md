# Preval test case

# base3.md

> Let true while > Base3
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
let y = 5;
let x = true;
while (x) {
  $(x);
  const tmpNestedComplexRhs = y - 1;
  y = tmpNestedComplexRhs;
  x = tmpNestedComplexRhs;
}
$(x, y);
`````


## Settled


`````js filename=intro
$(true);
$(4);
$(3);
$(2);
$(1);
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(4);
$(3);
$(2);
$(1);
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( 4 );
$( 3 );
$( 2 );
$( 1 );
$( 0, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = 5;
let x = true;
while (true) {
  if (x) {
    $(x);
    const tmpNestedComplexRhs = y - 1;
    y = tmpNestedComplexRhs;
    x = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(x, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 4
 - 3: 3
 - 4: 2
 - 5: 1
 - 6: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
