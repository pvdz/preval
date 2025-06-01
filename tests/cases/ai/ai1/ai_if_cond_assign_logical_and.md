# Preval test case

# ai_if_cond_assign_logical_and.md

> Ai > Ai1 > Ai if cond assign logical and
>
> Test: Complex conditional assignment with logical AND and side effects.

## Input

`````js filename=intro
// Expected: (Correct short-circuiting and value propagation for x and y)
let x, y = $('initial_y');
$('before', x, y);
if ((x = $('assign_A')) && (y = $('assign_B'))) {
  $('true_branch', x, y);
} else {
  $('false_branch', x, y);
}
$('after', x, y);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(`initial_y`);
$(`before`, undefined, y);
const tmpSSA_x /*:unknown*/ = $(`assign_A`);
if (tmpSSA_x) {
  const tmpNestedComplexRhs /*:unknown*/ = $(`assign_B`);
  if (tmpNestedComplexRhs) {
    $(`true_branch`, tmpSSA_x, tmpNestedComplexRhs);
    $(`after`, tmpSSA_x, tmpNestedComplexRhs);
  } else {
    $(`false_branch`, tmpSSA_x, tmpNestedComplexRhs);
    $(`after`, tmpSSA_x, tmpNestedComplexRhs);
  }
} else {
  $(`false_branch`, tmpSSA_x, y);
  $(`after`, tmpSSA_x, y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(`initial_y`);
$(`before`, undefined, y);
const tmpSSA_x = $(`assign_A`);
if (tmpSSA_x) {
  const tmpNestedComplexRhs = $(`assign_B`);
  if (tmpNestedComplexRhs) {
    $(`true_branch`, tmpSSA_x, tmpNestedComplexRhs);
    $(`after`, tmpSSA_x, tmpNestedComplexRhs);
  } else {
    $(`false_branch`, tmpSSA_x, tmpNestedComplexRhs);
    $(`after`, tmpSSA_x, tmpNestedComplexRhs);
  }
} else {
  $(`false_branch`, tmpSSA_x, y);
  $(`after`, tmpSSA_x, y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "initial_y" );
$( "before", undefined, a );
const b = $( "assign_A" );
if (b) {
  const c = $( "assign_B" );
  if (c) {
    $( "true_branch", b, c );
    $( "after", b, c );
  }
  else {
    $( "false_branch", b, c );
    $( "after", b, c );
  }
}
else {
  $( "false_branch", b, a );
  $( "after", b, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let y = $(`initial_y`);
$(`before`, x, y);
x = $(`assign_A`);
let tmpIfTest = x;
if (tmpIfTest) {
  const tmpNestedComplexRhs = $(`assign_B`);
  y = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(`true_branch`, x, y);
    $(`after`, x, y);
  } else {
    $(`false_branch`, x, y);
    $(`after`, x, y);
  }
} else {
  $(`false_branch`, x, y);
  $(`after`, x, y);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial_y'
 - 2: 'before', undefined, 'initial_y'
 - 3: 'assign_A'
 - 4: 'assign_B'
 - 5: 'true_branch', 'assign_A', 'assign_B'
 - 6: 'after', 'assign_A', 'assign_B'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
