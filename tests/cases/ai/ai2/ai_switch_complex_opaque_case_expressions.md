# Preval test case

# ai_switch_complex_opaque_case_expressions.md

> Ai > Ai2 > Ai switch complex opaque case expressions
>
> Test: Switch with complex/opaque case expressions.

## Input

`````js filename=intro
// Expected: Case expressions evaluated in order, side effects preserved.
let matchVal = $('switch_match_val', 2);
let result = 'default_val'; // Initialize to a distinct default
let effect_log = [];

switch (matchVal) {
  case ($('case_expr1_effect'), effect_log.push(1), $('case_expr1_val', 1)):
    result = 'one';
    effect_log.push('branch1');
    break;
  case ($('case_expr2_effect'), effect_log.push(2), $('case_expr2_val', 2)):
    result = 'two';
    effect_log.push('branch2');
    break;
  case ($('case_expr3_effect'), effect_log.push(3), $('case_expr3_val', 'no_match_val')):
    result = 'three';
    effect_log.push('branch3');
    break;
  default:
    effect_log.push('default_branch');
    result = 'default_branch_executed';
}
$('switch_complex_case_result', result);
$('switch_effects_logged', effect_log.join(','));
`````


## Settled


`````js filename=intro
const matchVal /*:unknown*/ = $(`switch_match_val`, 2);
$(`case_expr1_effect`);
const tmpBinBothRhs /*:unknown*/ = $(`case_expr1_val`, 1);
const tmpIfTest /*:boolean*/ = matchVal === tmpBinBothRhs;
const effect_log /*:array*/ /*truthy*/ = [1];
if (tmpIfTest) {
  $dotCall($array_push, effect_log, `push`, `branch1`);
  $(`switch_complex_case_result`, `one`);
} else {
  $(`case_expr2_effect`);
  $dotCall($array_push, effect_log, `push`, 2);
  const tmpBinBothRhs$1 /*:unknown*/ = $(`case_expr2_val`, 2);
  const tmpIfTest$1 /*:boolean*/ = matchVal === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $dotCall($array_push, effect_log, `push`, `branch2`);
    $(`switch_complex_case_result`, `two`);
  } else {
    $(`case_expr3_effect`);
    $dotCall($array_push, effect_log, `push`, 3);
    const tmpBinBothRhs$3 /*:unknown*/ = $(`case_expr3_val`, `no_match_val`);
    const tmpIfTest$3 /*:boolean*/ = matchVal === tmpBinBothRhs$3;
    if (tmpIfTest$3) {
      $dotCall($array_push, effect_log, `push`, `branch3`);
      $(`switch_complex_case_result`, `three`);
    } else {
      $dotCall($array_push, effect_log, `push`, `default_branch`);
      $(`switch_complex_case_result`, `default_branch_executed`);
    }
  }
}
const tmpCalleeParam /*:string*/ = $dotCall($array_join, effect_log, `join`, `,`);
$(`switch_effects_logged`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const matchVal = $(`switch_match_val`, 2);
$(`case_expr1_effect`);
const tmpIfTest = matchVal === $(`case_expr1_val`, 1);
const effect_log = [1];
if (tmpIfTest) {
  $dotCall($array_push, effect_log, `push`, `branch1`);
  $(`switch_complex_case_result`, `one`);
} else {
  $(`case_expr2_effect`);
  $dotCall($array_push, effect_log, `push`, 2);
  if (matchVal === $(`case_expr2_val`, 2)) {
    $dotCall($array_push, effect_log, `push`, `branch2`);
    $(`switch_complex_case_result`, `two`);
  } else {
    $(`case_expr3_effect`);
    $dotCall($array_push, effect_log, `push`, 3);
    if (matchVal === $(`case_expr3_val`, `no_match_val`)) {
      $dotCall($array_push, effect_log, `push`, `branch3`);
      $(`switch_complex_case_result`, `three`);
    } else {
      $dotCall($array_push, effect_log, `push`, `default_branch`);
      $(`switch_complex_case_result`, `default_branch_executed`);
    }
  }
}
$(`switch_effects_logged`, $dotCall($array_join, effect_log, `join`, `,`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "switch_match_val", 2 );
$( "case_expr1_effect" );
const b = $( "case_expr1_val", 1 );
const c = a === b;
const d = [ 1 ];
if (c) {
  $dotCall( $array_push, d, "push", "branch1" );
  $( "switch_complex_case_result", "one" );
}
else {
  $( "case_expr2_effect" );
  $dotCall( $array_push, d, "push", 2 );
  const e = $( "case_expr2_val", 2 );
  const f = a === e;
  if (f) {
    $dotCall( $array_push, d, "push", "branch2" );
    $( "switch_complex_case_result", "two" );
  }
  else {
    $( "case_expr3_effect" );
    $dotCall( $array_push, d, "push", 3 );
    const g = $( "case_expr3_val", "no_match_val" );
    const h = a === g;
    if (h) {
      $dotCall( $array_push, d, "push", "branch3" );
      $( "switch_complex_case_result", "three" );
    }
    else {
      $dotCall( $array_push, d, "push", "default_branch" );
      $( "switch_complex_case_result", "default_branch_executed" );
    }
  }
}
const i = $dotCall( $array_join, d, "join", "," );
$( "switch_effects_logged", i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let matchVal = $(`switch_match_val`, 2);
let result = `default_val`;
let effect_log = [];
tmpSwitchBreak: {
  const tmpSwitchDisc = matchVal;
  const tmpBinBothLhs = tmpSwitchDisc;
  $(`case_expr1_effect`);
  const tmpMCF = effect_log.push;
  $dotCall(tmpMCF, effect_log, `push`, 1);
  const tmpBinBothRhs = $(`case_expr1_val`, 1);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    result = `one`;
    const tmpMCF$1 = effect_log.push;
    $dotCall(tmpMCF$1, effect_log, `push`, `branch1`);
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    $(`case_expr2_effect`);
    const tmpMCF$3 = effect_log.push;
    $dotCall(tmpMCF$3, effect_log, `push`, 2);
    const tmpBinBothRhs$1 = $(`case_expr2_val`, 2);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      result = `two`;
      const tmpMCF$5 = effect_log.push;
      $dotCall(tmpMCF$5, effect_log, `push`, `branch2`);
      break tmpSwitchBreak;
    } else {
      const tmpBinBothLhs$3 = tmpSwitchDisc;
      $(`case_expr3_effect`);
      const tmpMCF$7 = effect_log.push;
      $dotCall(tmpMCF$7, effect_log, `push`, 3);
      const tmpBinBothRhs$3 = $(`case_expr3_val`, `no_match_val`);
      const tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
      if (tmpIfTest$3) {
        result = `three`;
        const tmpMCF$9 = effect_log.push;
        $dotCall(tmpMCF$9, effect_log, `push`, `branch3`);
        break tmpSwitchBreak;
      } else {
        const tmpMCF$11 = effect_log.push;
        $dotCall(tmpMCF$11, effect_log, `push`, `default_branch`);
        result = `default_branch_executed`;
      }
    }
  }
}
$(`switch_complex_case_result`, result);
const tmpMCF$13 = effect_log.join;
let tmpCalleeParam = $dotCall(tmpMCF$13, effect_log, `join`, `,`);
$(`switch_effects_logged`, tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) access object property that also exists on prototype? $array_push
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'switch_match_val', 2
 - 2: 'case_expr1_effect'
 - 3: 'case_expr1_val', 1
 - 4: 'case_expr2_effect'
 - 5: 'case_expr2_val', 2
 - 6: 'case_expr3_effect'
 - 7: 'case_expr3_val', 'no_match_val'
 - 8: 'switch_complex_case_result', 'default_branch_executed'
 - 9: 'switch_effects_logged', '1,2,3,default_branch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
