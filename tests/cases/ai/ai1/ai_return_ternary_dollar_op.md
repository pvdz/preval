# Preval test case

# ai_return_ternary_dollar_op.md

> Ai > Ai1 > Ai return ternary dollar op
>
> Test: Return value from ternary whose operands are $() calls.

## Input

`````js filename=intro
// Expected: function f(c) { if (c) return $('A'); else return $('B'); } let r = f($('cond')); $('result', r);
function f(cond_param) {
  let result = cond_param ? $('A') : $('B');
  return result;
}
let r = f( $('cond') );
$('result', r);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`cond`);
if (tmpCalleeParam) {
  const tmpClusterSSA_r /*:unknown*/ = $(`A`);
  $(`result`, tmpClusterSSA_r);
} else {
  const tmpClusterSSA_r$1 /*:unknown*/ = $(`B`);
  $(`result`, tmpClusterSSA_r$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  $(`result`, $(`A`));
} else {
  $(`result`, $(`B`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  const b = $( "A" );
  $( "result", b );
}
else {
  const c = $( "B" );
  $( "result", c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let cond_param = $$0;
  debugger;
  let result = undefined;
  if (cond_param) {
    result = $(`A`);
    return result;
  } else {
    result = $(`B`);
    return result;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam = $(`cond`);
let r = f(tmpCalleeParam);
$(`result`, r);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'A'
 - 3: 'result', 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
