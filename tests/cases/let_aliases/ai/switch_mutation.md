# Preval test case

# switch_mutation.md

> Let aliases > Ai > Switch mutation
>
> Mutation in a switch statement (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
switch ($("cond")) {
  case 1:
    x = "changed1";
    break;
  case 2:
    x = "changed2";
    break;
  default:
    x = "changed3";
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
const tmpSwitchDisc /*:unknown*/ = $(`cond`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === 1;
if (tmpIfTest) {
  $(x, `changed1`);
} else {
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === 2;
  if (tmpIfTest$1) {
    $(x, `changed2`);
  } else {
    $(x, `changed3`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
const tmpSwitchDisc = $(`cond`);
if (tmpSwitchDisc === 1) {
  $(x, `changed1`);
} else {
  if (tmpSwitchDisc === 2) {
    $(x, `changed2`);
  } else {
    $(x, `changed3`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = $( "cond" );
const c = b === 1;
if (c) {
  $( a, "changed1" );
}
else {
  const d = b === 2;
  if (d) {
    $( a, "changed2" );
  }
  else {
    $( a, "changed3" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
tmpSwitchBreak: {
  const tmpSwitchDisc = $(`cond`);
  const tmpIfTest = tmpSwitchDisc === 1;
  if (tmpIfTest) {
    x = `changed1`;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === 2;
    if (tmpIfTest$1) {
      x = `changed2`;
      break tmpSwitchBreak;
    } else {
      x = `changed3`;
    }
  }
}
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'cond'
 - 3: 'val', 'changed3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
