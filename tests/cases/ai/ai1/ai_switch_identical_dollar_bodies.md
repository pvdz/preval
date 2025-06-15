# Preval test case

# ai_switch_identical_dollar_bodies.md

> Ai > Ai1 > Ai switch identical dollar bodies
>
> Test: Switch statement (normalized to if-else) where all case bodies are identical simple $() calls.

## Input

`````js filename=intro
// Expected: let v = $('input'); $('effect'); $('after', v);
let val = $('input');
switch (val) {
  case 1:
    $('effect');
    break;
  case 'foo':
    $('effect');
    break;
  default:
    $('effect');
}
$('after', val);
`````


## Settled


`````js filename=intro
const val /*:unknown*/ = $(`input`);
$(`effect`);
const tmpIfTest /*:boolean*/ = val === 1;
if (tmpIfTest) {
  $(`after`, 1);
} else {
  $(`after`, val);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val = $(`input`);
$(`effect`);
if (val === 1) {
  $(`after`, 1);
} else {
  $(`after`, val);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input" );
$( "effect" );
const b = a === 1;
if (b) {
  $( "after", 1 );
}
else {
  $( "after", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val = $(`input`);
tmpSwitchBreak: {
  const tmpSwitchDisc = val;
  const tmpIfTest = tmpSwitchDisc === 1;
  if (tmpIfTest) {
    $(`effect`);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === `foo`;
    if (tmpIfTest$1) {
      $(`effect`);
      break tmpSwitchBreak;
    } else {
      $(`effect`);
    }
  }
}
$(`after`, val);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input'
 - 2: 'effect'
 - 3: 'after', 'input'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
