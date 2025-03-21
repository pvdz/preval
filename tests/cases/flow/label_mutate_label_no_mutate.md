# Preval test case

# label_mutate_label_no_mutate.md

> Flow > Label mutate label no mutate
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  foo: {
    bar: {
      if ($) {
        x = 'pass';
        break foo;
      } else {
        break bar;
      }
    }
    // Do not consider x mutated here
    $(x);
  }
  // Consider x mutated here
  $(x);
}
f();
`````

## Settled


`````js filename=intro
if ($) {
  $(`pass`);
} else {
  $(`fail`);
  $(`fail`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(`pass`);
} else {
  $(`fail`);
  $(`fail`);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  foo: {
    bar: {
      if ($) {
        x = `pass`;
        break foo;
      } else {
        break bar;
      }
    }
    $(x);
  }
  $(x);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  foo: {
    bar: {
      if ($) {
        x = `pass`;
        break foo;
      } else {
        break bar;
      }
    }
    $(x);
  }
  $(x);
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( "pass" );
}
else {
  $( "fail" );
  $( "fail" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
