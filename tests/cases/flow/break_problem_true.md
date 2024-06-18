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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = `pass`;
  foo: {
    bar: {
      if ($(true)) break foo;
      else break bar;
    }
    x = `fail`;
  }
  $(x);
};
f();
`````

## Normalized


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

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

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

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
