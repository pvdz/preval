# Preval test case

# parseint_call.md

> Free > Free loops > Parseint call
>
>

## Input

`````js filename=intro
let counter /*:number*/ = 0;
const arr /*:array*/ = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  arr.push(counter);
  counter = counter + 1;
  const test /*:boolean*/ = counter > 20;
  if (test) {
    break;
  } else {
    const tmpIfTest /*:boolean*/ = isNaN(counter) === 5; // <--
    if (tmpIfTest) {
      counter = counter + 10;
    } else {
    }
  }
}
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
