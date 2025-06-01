# Preval test case

# ai_eval_with_dollar_calls.md

> Ai > Ai1 > Ai eval with dollar calls
>
> Test: eval executing code that contains $() calls.

## Input

`````js filename=intro
// Expected: (eval call preserved, $() inside eval string likely untouched by Preval)
let codeToEval = "$('dollar_inside_eval', 123);";
$('before_eval');
eval(codeToEval);
$('after_eval');
`````


## Settled


`````js filename=intro
$(`before_eval`);
eval(`\$('dollar_inside_eval', 123);`);
$(`after_eval`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before_eval`);
eval(`\$('dollar_inside_eval', 123);`);
$(`after_eval`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before_eval" );
eval( "$('dollar_inside_eval', 123);" );
$( "after_eval" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let codeToEval = `\$('dollar_inside_eval', 123);`;
$(`before_eval`);
eval(codeToEval);
$(`after_eval`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before_eval'
 - 2: 'dollar_inside_eval', 123
 - 3: 'after_eval'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
