# Preval test case

# default_easy.md

> Normalize > Switch > Default easy
>
> Normalize switches

## Input

`````js filename=intro
switch (1) {
  case 1: $(1);
  default: $(2);
}
`````


## Settled


`````js filename=intro
$(1);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  $(1);
} else {
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
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
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
