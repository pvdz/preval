# Preval test case

# math_in_if_condition.md

> Math > Ai > Math in if condition
>
> Math in if condition with coercion

## Input

`````js filename=intro
const a = $(Math.sign(-5));
let result;
if (a) {
  result = "nonzero";
} else {
  result = "zero";
}
$(result);
// Should be "nonzero"
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-1);
if (a) {
  $(`nonzero`);
} else {
  $(`zero`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(-1)) {
  $(`nonzero`);
} else {
  $(`zero`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -1 );
if (a) {
  $( "nonzero" );
}
else {
  $( "zero" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sign;
let tmpCalleeParam = -1;
const a = $(tmpCalleeParam);
let result = undefined;
if (a) {
  result = `nonzero`;
  $(result);
} else {
  result = `zero`;
  $(result);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - 2: 'nonzero'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
