# Preval test case

# break_last.md

> Unwind loops > Separate test > Break last
>
> Unrolling loops

## Input

`````js filename=intro
for (let i=0; i<10; ++i) $(i);
`````


## Settled


`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
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
$(6);
$(7);
$(8);
$(9);
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
$( 6 );
$( 7 );
$( 8 );
$( 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
while (true) {
  const tmpIfTest = i < 10;
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
 - 7: 6
 - 8: 7
 - 9: 8
 - 10: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
