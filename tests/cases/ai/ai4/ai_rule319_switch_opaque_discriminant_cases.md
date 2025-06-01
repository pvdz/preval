# Preval test case

# ai_rule319_switch_opaque_discriminant_cases.md

> Ai > Ai4 > Ai rule319 switch opaque discriminant cases
>
> Test: Switch with opaque discriminant and opaque case values.

## Input

`````js filename=intro
// Expected: switch($('switch_val')) { case $('case1'): $('path1'); break; case $('case2'): $('path2'); break; default: $('default_path'); }
switch($('switch_val')) {
  case $('case1'):
    $('path1');
    break;
  case $('case2'):
    $('path2');
    break;
  default:
    $('default_path');
}
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(`switch_val`);
const tmpBinBothRhs /*:unknown*/ = $(`case1`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`path1`);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(`case2`);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`path2`);
  } else {
    $(`default_path`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(`switch_val`);
if (tmpSwitchDisc === $(`case1`)) {
  $(`path1`);
} else {
  if (tmpSwitchDisc === $(`case2`)) {
    $(`path2`);
  } else {
    $(`default_path`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "switch_val" );
const b = $( "case1" );
const c = a === b;
if (c) {
  $( "path1" );
}
else {
  const d = $( "case2" );
  const e = a === d;
  if (e) {
    $( "path2" );
  }
  else {
    $( "default_path" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(`switch_val`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`case1`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(`path1`);
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $(`case2`);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(`path2`);
      break tmpSwitchBreak;
    } else {
      $(`default_path`);
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'switch_val'
 - 2: 'case1'
 - 3: 'case2'
 - 4: 'default_path'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
