# Preval test case

# if_mutates_break_else_no_complete.md

> Flow > If mutates break else no complete
>
> The mechanism has to consider that the if didn't complete in both branches, but may only have mutated the binding after the label node (and of course inside the branch that breaks until it breaks). Point is that it shouldn't skip the `else` branch.

#TODO

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

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = `pass`;
  foo: {
    if ($(true)) {
      $(x, `not mutating, not completing`);
    } else {
      x = `fail`;
      break foo;
    }
    $(x, `should not be considered mutated`);
  }
  $(x, `after label`);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpAfterLabel = function ($$0) {
    let x$1 = $$0;
    debugger;
    $(x$1, `after label`);
    return undefined;
  };
  let x = `pass`;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(x, `not mutating, not completing`);
    $(x, `should not be considered mutated`);
    const tmpReturnArg$1 = tmpAfterLabel(x);
    return tmpReturnArg$1;
  } else {
    x = `fail`;
    const tmpReturnArg = tmpAfterLabel(x);
    return tmpReturnArg;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`pass`, `not mutating, not completing`);
  $(`pass`, `should not be considered mutated`);
  $(`pass`, `after label`);
} else {
  $(`fail`, `after label`);
}
`````

## PST Output

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

## Result

Should call `$` with:
 - 1: true
 - 2: 'pass', 'not mutating, not completing'
 - 3: 'pass', 'should not be considered mutated'
 - 4: 'pass', 'after label'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
