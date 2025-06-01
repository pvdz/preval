# Preval test case

# ai_rule317_logical_op_opaque_if.md

> Ai > Ai4 > Ai rule317 logical op opaque if
>
> Test: Logical expression with opaque operands, result used in if.

## Input

`````js filename=intro
// Expected: if ( ($('op1') && $('op2')) || $('op3') ) { $('then_branch'); } else { $('else_branch'); }
if ( ($('op1') && $('op2')) || $('op3') ) {
  $('then_branch');
} else {
  $('else_branch');
}
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = $(`op1`);
if (tmpIfTest) {
  tmpIfTest = $(`op2`);
} else {
}
if (tmpIfTest) {
  $(`then_branch`);
} else {
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(`op3`);
  if (tmpClusterSSA_tmpIfTest) {
    $(`then_branch`);
  } else {
    $(`else_branch`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = $(`op1`);
if (tmpIfTest) {
  tmpIfTest = $(`op2`);
}
if (tmpIfTest) {
  $(`then_branch`);
} else {
  if ($(`op3`)) {
    $(`then_branch`);
  } else {
    $(`else_branch`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "op1" );
if (a) {
  a = $( "op2" );
}
if (a) {
  $( "then_branch" );
}
else {
  const b = $( "op3" );
  if (b) {
    $( "then_branch" );
  }
  else {
    $( "else_branch" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpIfTest = $(`op1`);
if (tmpIfTest) {
  tmpIfTest = $(`op2`);
} else {
}
if (tmpIfTest) {
  $(`then_branch`);
} else {
  tmpIfTest = $(`op3`);
  if (tmpIfTest) {
    $(`then_branch`);
  } else {
    $(`else_branch`);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'op1'
 - 2: 'op2'
 - 3: 'then_branch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
