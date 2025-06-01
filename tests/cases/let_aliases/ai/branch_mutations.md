# Preval test case

# branch_mutations.md

> Let aliases > Ai > Branch mutations
>
> Aliasing with multiple mutations in different branches (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
if ($("cond")) {
  x = "branch1";
} else {
  x = "branch2";
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  $(x, `branch1`);
} else {
  $(x, `branch2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
if ($(`cond`)) {
  $(x, `branch1`);
} else {
  $(x, `branch2`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = $( "cond" );
if (b) {
  $( a, "branch1" );
}
else {
  $( a, "branch2" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  x = `branch1`;
} else {
  x = `branch2`;
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
 - 3: 'val', 'branch1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
