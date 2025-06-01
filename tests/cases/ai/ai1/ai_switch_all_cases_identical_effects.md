# Preval test case

# ai_switch_all_cases_identical_effects.md

> Ai > Ai1 > Ai switch all cases identical effects
>
> Test: Switch where all case bodies are identical with side effects.

## Input

`````js filename=intro
// Expected: $('input'); $('C1'); $('C2'); $('effect_A'); $('effect_B'); $('after');
let v = $('input');
switch (v) {
  case $('C1'):
    $('effect_A');
    $('effect_B');
    break;
  case $('C2'):
    $('effect_A');
    $('effect_B');
    break;
  default:
    $('effect_A');
    $('effect_B');
}
$('after');
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(`input`);
const tmpBinBothRhs /*:unknown*/ = $(`C1`);
const tmpIfTest /*:boolean*/ = v === tmpBinBothRhs;
if (tmpIfTest) {
  $(`effect_A`);
  $(`effect_B`);
  $(`after`);
} else {
  $(`C2`);
  $(`effect_A`);
  $(`effect_B`);
  $(`after`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`input`) === $(`C1`)) {
  $(`effect_A`);
  $(`effect_B`);
  $(`after`);
} else {
  $(`C2`);
  $(`effect_A`);
  $(`effect_B`);
  $(`after`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input" );
const b = $( "C1" );
const c = a === b;
if (c) {
  $( "effect_A" );
  $( "effect_B" );
  $( "after" );
}
else {
  $( "C2" );
  $( "effect_A" );
  $( "effect_B" );
  $( "after" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let v = $(`input`);
tmpSwitchBreak: {
  const tmpSwitchDisc = v;
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`C1`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(`effect_A`);
    $(`effect_B`);
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $(`C2`);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(`effect_A`);
      $(`effect_B`);
      break tmpSwitchBreak;
    } else {
      $(`effect_A`);
      $(`effect_B`);
    }
  }
}
$(`after`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input'
 - 2: 'C1'
 - 3: 'C2'
 - 4: 'effect_A'
 - 5: 'effect_B'
 - 6: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
