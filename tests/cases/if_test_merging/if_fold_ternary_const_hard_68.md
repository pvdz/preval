# Preval test case

# if_fold_ternary_const_hard_68.md

> If test merging > If fold ternary const hard 68
>
> Hard Case 68: NO CHANGE - y assigned tagged template literal

## Input

`````js filename=intro
let x = $(true);
let y = !x; // x=T,y=F; x=F,y=T
function myTag(strings) { return strings.join(''); }

if (x) {
  // x is true, y was false.
  y = myTag`hello`; // RHS is TaggedTemplateExpression. yMadeTruthyInThen=false.
} else {
  // x is false, y was true. Not reassigned.
}

// No change by this rule.
if (y) {
  $('THEN');
} else {
  $('ELSE');
}

/* Expected output (NO CHANGE by this rule):
let x = $(true);
let y = !x;
function myTag(strings) { return strings.join(''); }
if (x) {
  y = myTag`hello`;
} else {}
if (y) {
  $('THEN');
} else {
  $('ELSE');
}
*/
`````


## Settled


`````js filename=intro
$(true);
$(`THEN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`THEN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "THEN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let myTag = function ($$0) {
  let strings = $$0;
  debugger;
  const tmpMCF = strings.join;
  const tmpReturnArg = $dotCall(tmpMCF, strings, `join`, ``);
  return tmpReturnArg;
};
let x = $(true);
let y = !x;
if (x) {
  const tmpCallCallee = myTag;
  let tmpCalleeParam = [`hello`];
  y = myTag(tmpCalleeParam);
} else {
}
if (y) {
  $(`THEN`);
} else {
  $(`ELSE`);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'THEN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
