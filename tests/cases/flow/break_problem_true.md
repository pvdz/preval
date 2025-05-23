# Preval test case

# break_problem_true.md

> Flow > Break problem true
>
> Must track all labeled breaks when checking if a binding is mutated

## Input

`````js filename=intro
function f() {
  let x = 'pass';
  foo: {
    bar: {
      if ($(true)) break foo;
      else break bar;
    }
    x = 'fail'; // Not visited
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = `pass`;
  foo: {
    bar: {
      const tmpIfTest = $(true);
      if (tmpIfTest) {
        break foo;
      } else {
        break bar;
      }
    }
    x = `fail`;
  }
  $(x);
  return undefined;
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
