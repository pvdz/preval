# Preval test case

# first_test_write_not_var.md

> Unwind loops > Separate test > First test write not var
>
> Unrolling loops

## Input

`````js filename=intro
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
let counter = 0;
let test = counter < 10;
`````


## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: while (test) {`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: while (test) {`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: while (test) {";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
