# Preval test case

# while_norm.md

> Ai > Ai5 > While norm
>
> Test while loop normalization

## Input

`````js filename=intro
let i = 0;
while (i < 3) {
    $(i);  // Track loop iteration
    i = i + 1;
}
$(i);

// Expected:
// let i = 0;
// while (true) {
//     if (!(i < 3)) {
//         break;
//     }
//     $(i);
//     i = i + 1;
// }
// $(i);
`````


## Settled


`````js filename=intro
$(0);
$(1);
$(2);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(1);
$(2);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( 1 );
$( 2 );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
while (true) {
  const tmpIfTest = i < 3;
  if (tmpIfTest) {
    $(i);
    i = i + 1;
  } else {
    break;
  }
}
$(i);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
