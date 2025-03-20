# Preval test case

# if_mutates_break_else_no_complete.md

> Flow > If mutates break else no complete
>
> The mechanism has to consider that the if didn't complete in both branches, but may only have mutated the binding after the label node (and of course inside the branch that breaks until it breaks). Point is that it shouldn't skip the `else` branch.

## Input

`````js filename=intro
function f() {
  let x = 'pass';
  foo: {
    if ($(true)) {
      $(x, 'not mutating, not completing');
    } else {
      x = 'fail';
      break foo;
    }
    $(x, 'should not be considered mutated');
  }
  // Consider x mutated here
  $(x, 'after label');
}
f();
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`pass`, `not mutating, not completing`);
  $(`pass`, `should not be considered mutated`);
  $(`pass`, `after label`);
} else {
  $(`fail`, `after label`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`pass`, `not mutating, not completing`);
  $(`pass`, `should not be considered mutated`);
  $(`pass`, `after label`);
} else {
  $(`fail`, `after label`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "pass", "not mutating, not completing" );
  $( "pass", "should not be considered mutated" );
  $( "pass", "after label" );
}
else {
  $( "fail", "after label" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'pass', 'not mutating, not completing'
 - 3: 'pass', 'should not be considered mutated'
 - 4: 'pass', 'after label'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
