# Preval test case

# 0_5_1_rev_gte.md

> Unwind loops > Separate test > 0 5 1 rev gte
>
> Unrolling loops

## Input

`````js filename=intro
for (let i=0; 5>=i; ++i) $(i);
`````


## Settled


`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
while (true) {
  const tmpIfTest = 5 >= i;
  if (tmpIfTest) {
    $(i);
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
