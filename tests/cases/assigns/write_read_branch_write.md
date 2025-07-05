# Preval test case

# write_read_branch_write.md

> Assigns > Write read branch write
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) $(x, 'branch')
x = $(2);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  $(x, `branch`);
} else {
}
const tmpClusterSSA_x /*:unknown*/ = $(2);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if ($(10)) {
  $(x, `branch`);
}
$($(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 10 );
if (b) {
  $( a, "branch" );
}
const c = $( 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  $(x, `branch`);
} else {
}
x = $(2);
$(x);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 1, 'branch'
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
