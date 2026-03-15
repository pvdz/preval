# Preval test case

# e2.md

> Switch > Gpt cases > E2
>
> simple tdz bug case

other cases:
switch (x) {
  case 0:
    let a = 1;
    break;
  case 1:
    typeof a;
}

let g;
switch (x) {
  case 0:
    const a = 1;
    g = () => a;
    break;
  default:
    g = () => a;
}
g();


## Input

`````js filename=intro
switch (1) {
  case 0:
    const a = 1;
  default:
    $(a);
}
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = 1;
} else {
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $(a);
} else {
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

Normalized calls: BAD!?
 - !1: undefined
 - !eval returned: undefined

Post settled calls: BAD!!
 - !1: undefined
 - !eval returned: undefined

Denormalized calls: BAD!!
 - !1: undefined
 - !eval returned: undefined
