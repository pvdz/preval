# Preval test case

# self_assignment_tdz.md

> Tofix > self assignment tdz

## Input

`````js filename=intro
// TDZ case. Not sure why it's not caught. Yet.
let y = !y;

if (y) {
  y = true; 
} else {
  y = false;
}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
`````


## Settled


`````js filename=intro
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = !y;
if (y) {
  y = true;
} else {
  y = false;
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: 'THEN'
 - !eval returned: undefined

Denormalized calls: BAD!!
 - !1: 'THEN'
 - !eval returned: undefined
