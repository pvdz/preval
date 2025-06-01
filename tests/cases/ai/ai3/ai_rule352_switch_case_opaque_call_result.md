# Preval test case

# ai_rule352_switch_case_opaque_call_result.md

> Ai > Ai3 > Ai rule352 switch case opaque call result
>
> Test: switch statement where case expressions are opaque function call results.

## Input

`````js filename=intro
// Expected: switch($('d')) { case $('cA')(): $('A'); break; case $('cB')(): $('B'); break; }
let discriminant = $('getDiscriminant');
switch (discriminant) {
  case $('getCaseValueA')(): // Opaque call for case value
    $('branchA_taken');
    break;
  case $('getCaseValueB')(): // Another opaque call
    $('branchB_taken');
    break;
  default:
    $('branchDefault_taken');
}
$('done_switch');
`````


## Settled


`````js filename=intro
const discriminant /*:unknown*/ = $(`getDiscriminant`);
const tmpCallComplexCallee /*:unknown*/ = $(`getCaseValueA`);
const tmpBinBothRhs /*:unknown*/ = tmpCallComplexCallee();
const tmpIfTest /*:boolean*/ = discriminant === tmpBinBothRhs;
if (tmpIfTest) {
  $(`branchA_taken`);
  $(`done_switch`);
} else {
  const tmpCallComplexCallee$1 /*:unknown*/ = $(`getCaseValueB`);
  const tmpBinBothRhs$1 /*:unknown*/ = tmpCallComplexCallee$1();
  const tmpIfTest$1 /*:boolean*/ = discriminant === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`branchB_taken`);
    $(`done_switch`);
  } else {
    $(`branchDefault_taken`);
    $(`done_switch`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const discriminant = $(`getDiscriminant`);
const tmpCallComplexCallee = $(`getCaseValueA`);
if (discriminant === tmpCallComplexCallee()) {
  $(`branchA_taken`);
  $(`done_switch`);
} else {
  const tmpCallComplexCallee$1 = $(`getCaseValueB`);
  if (discriminant === tmpCallComplexCallee$1()) {
    $(`branchB_taken`);
    $(`done_switch`);
  } else {
    $(`branchDefault_taken`);
    $(`done_switch`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "getDiscriminant" );
const b = $( "getCaseValueA" );
const c = b();
const d = a === c;
if (d) {
  $( "branchA_taken" );
  $( "done_switch" );
}
else {
  const e = $( "getCaseValueB" );
  const f = e();
  const g = a === f;
  if (g) {
    $( "branchB_taken" );
    $( "done_switch" );
  }
  else {
    $( "branchDefault_taken" );
    $( "done_switch" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let discriminant = $(`getDiscriminant`);
tmpSwitchBreak: {
  const tmpSwitchDisc = discriminant;
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpCallComplexCallee = $(`getCaseValueA`);
  const tmpBinBothRhs = tmpCallComplexCallee();
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(`branchA_taken`);
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpCallComplexCallee$1 = $(`getCaseValueB`);
    const tmpBinBothRhs$1 = tmpCallComplexCallee$1();
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(`branchB_taken`);
      break tmpSwitchBreak;
    } else {
      $(`branchDefault_taken`);
    }
  }
}
$(`done_switch`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'getDiscriminant'
 - 2: 'getCaseValueA'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
