# Preval test case

# ai_rule349_eval_string_contains_dollar_call.md

> Ai > Ai3 > Ai rule349 eval string contains dollar call
>
> Test: eval a string that itself contains a call to $().

## Input

`````js filename=intro
// Expected: eval("$('evaluated')"); $('after_eval');
let strToEval = "$('string_dollar_call')"; // The string itself
$('before_eval', strToEval);
try {
  eval(strToEval);
} catch (e) {
  $('eval_error', e.name); // e.g. ReferenceError if $ is not global in eval scope
}
$('after_eval');
`````


## Settled


`````js filename=intro
$(`before_eval`, `\$('string_dollar_call')`);
try {
  eval(`\$('string_dollar_call')`);
} catch (e) {
  const tmpCalleeParam /*:unknown*/ = e.name;
  $(`eval_error`, tmpCalleeParam);
}
$(`after_eval`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before_eval`, `\$('string_dollar_call')`);
try {
  eval(`\$('string_dollar_call')`);
} catch (e) {
  $(`eval_error`, e.name);
}
$(`after_eval`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before_eval", "$('string_dollar_call')" );
try {
  eval( "$('string_dollar_call')" );
}
catch (a) {
  const b = a.name;
  $( "eval_error", b );
}
$( "after_eval" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let strToEval = `\$('string_dollar_call')`;
$(`before_eval`, strToEval);
try {
  eval(strToEval);
} catch (e) {
  let tmpCalleeParam = e.name;
  $(`eval_error`, tmpCalleeParam);
}
$(`after_eval`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before_eval', "$('string_dollar_call')"
 - 2: 'string_dollar_call'
 - 3: 'after_eval'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
