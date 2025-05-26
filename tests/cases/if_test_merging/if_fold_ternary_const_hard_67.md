# Preval test case

# if_fold_ternary_const_hard_67.md

> If test merging > If fold ternary const hard 67
>
> NO CHANGE by this rule for if(y) inside Obj or if y was global

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T

function Obj() {
  this.value = $(true);
  if (x) {
    // x is true, y was false.
    y = this.value; // RHS is MemberExpression (this.value). yMadeTruthyInThen=false.
  } else {
    // x is false, y was true. Not reassigned.
  }
}

// No change by this rule.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule for if(y) inside Obj or if y was global):
let x = $(true);
let y = !x;
function Obj() {
  this.value = $(true);
  if (x) {
    y = this.value;
  } else {}
}
if (y) { // Assuming y is accessible here for the test target.
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`ELSE`);
} else {
  $(`THEN`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "ELSE" );
}
else {
  $( "THEN" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let Obj = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpAssignMemLhsObj = tmpPrevalAliasThis;
  const tmpAssignMemRhs = $(true);
  tmpAssignMemLhsObj.value = tmpAssignMemRhs;
  if (x) {
    y = tmpPrevalAliasThis.value;
    return undefined;
  } else {
    return undefined;
  }
};
let x = $(true);
let y = !x;
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'ELSE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
