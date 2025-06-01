# Preval test case

# ai_rule362_comma_op_if_condition.md

> Ai > Ai3 > Ai rule362 comma op if condition
>
> Rule 362: Comma operator in if condition

## Input

`````js filename=intro
(function() {
  let x = 0;
  if (($('op1', (x=1)), $('op2', (x=2)), $('op3', x === 2))) {
    $('if_true', x);
  } else {
    $('if_false', x);
  }
  // x should be 2 regardless of the branch taken, due to op2
   $('final_x', x);
})();
`````


## Settled


`````js filename=intro
$(`op1`, 1);
$(`op2`, 2);
const tmpIfTest /*:unknown*/ = $(`op3`, true);
if (tmpIfTest) {
  $(`if_true`, 2);
  $(`final_x`, 2);
} else {
  $(`if_false`, 2);
  $(`final_x`, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`op1`, 1);
$(`op2`, 2);
if ($(`op3`, true)) {
  $(`if_true`, 2);
  $(`final_x`, 2);
} else {
  $(`if_false`, 2);
  $(`final_x`, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "op1", 1 );
$( "op2", 2 );
const a = $( "op3", true );
if (a) {
  $( "if_true", 2 );
  $( "final_x", 2 );
}
else {
  $( "if_false", 2 );
  $( "final_x", 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let x = 0;
  x = 1;
  let tmpCalleeParam = x;
  $(`op1`, x);
  x = 2;
  let tmpCalleeParam$1 = x;
  $(`op2`, x);
  let tmpCalleeParam$3 = x === 2;
  const tmpIfTest = $(`op3`, tmpCalleeParam$3);
  if (tmpIfTest) {
    $(`if_true`, x);
    $(`final_x`, x);
    return undefined;
  } else {
    $(`if_false`, x);
    $(`final_x`, x);
    return undefined;
  }
};
tmpCallComplexCallee();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'op1', 1
 - 2: 'op2', 2
 - 3: 'op3', true
 - 4: 'if_true', 2
 - 5: 'final_x', 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
