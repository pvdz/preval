# Preval test case

# ai_debugger_statement_handling.md

> Ai > Ai2 > Ai debugger statement handling
>
> Test: debugger; statement.

## Input

`````js filename=intro
// Expected: Preserved if Preval doesn't strip it, or handled as per Preval's design.
// Preval usually inserts its own debugger; statements, so user-ones might be stripped or kept.
$('before_debugger');
debugger;
$('after_debugger');

function foo() {
  $('foo_before_debugger');
  debugger;
  $('foo_after_debugger');
  return $('foo_return');
}
foo();
`````


## Settled


`````js filename=intro
$(`before_debugger`);
$(`after_debugger`);
$(`foo_before_debugger`);
$(`foo_after_debugger`);
$(`foo_return`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before_debugger`);
$(`after_debugger`);
$(`foo_before_debugger`);
$(`foo_after_debugger`);
$(`foo_return`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before_debugger" );
$( "after_debugger" );
$( "foo_before_debugger" );
$( "foo_after_debugger" );
$( "foo_return" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function () {
  debugger;
  $(`foo_before_debugger`);
  $(`foo_after_debugger`);
  const tmpReturnArg = $(`foo_return`);
  return tmpReturnArg;
};
$(`before_debugger`);
$(`after_debugger`);
foo();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before_debugger'
 - 2: 'after_debugger'
 - 3: 'foo_before_debugger'
 - 4: 'foo_after_debugger'
 - 5: 'foo_return'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
