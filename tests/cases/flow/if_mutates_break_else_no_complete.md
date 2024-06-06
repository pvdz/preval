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
  let x = `pass`;
  foo: {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(x, `not mutating, not completing`);
      $(x, `should not be considered mutated`);
    } else {
      x = `fail`;
      break foo;
    }
  }
  $(x, `after label`);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
let x = `pass`;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`pass`, `not mutating, not completing`);
  $(`pass`, `should not be considered mutated`);
} else {
  x = `fail`;
}
$(x, `after label`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = "pass";
const b = $( true );
if (b) {
  $( "pass", "not mutating, not completing" );
  $( "pass", "should not be considered mutated" );
}
else {
  a = "fail";
}
$( a, "after label" );
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
