# Preval test case

# nested_branch_mutations.md

> Let aliases > Ai > Nested branch mutations
>
> Multiple mutations in nested branches (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
if ($("cond1")) {
  if ($("cond2")) {
    x = "branch2";
  } else {
    x = "branch3";
  }
} else {
  x = "branch4";
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
const tmpIfTest /*:unknown*/ = $(`cond1`);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(`cond2`);
  if (tmpIfTest$1) {
    $(x, `branch2`);
  } else {
    $(x, `branch3`);
  }
} else {
  $(x, `branch4`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
if ($(`cond1`)) {
  if ($(`cond2`)) {
    $(x, `branch2`);
  } else {
    $(x, `branch3`);
  }
} else {
  $(x, `branch4`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = $( "cond1" );
if (b) {
  const c = $( "cond2" );
  if (c) {
    $( a, "branch2" );
  }
  else {
    $( a, "branch3" );
  }
}
else {
  $( a, "branch4" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpIfTest = $(`cond1`);
if (tmpIfTest) {
  const tmpIfTest$1 = $(`cond2`);
  if (tmpIfTest$1) {
    x = `branch2`;
  } else {
    x = `branch3`;
  }
} else {
  x = `branch4`;
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
 - 2: 'cond1'
 - 3: 'cond2'
 - 4: 'val', 'branch2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
