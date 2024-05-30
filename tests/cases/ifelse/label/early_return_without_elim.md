# Preval test case

# early_return_without_elim.md

> Ifelse > Label > Early return without elim
>
> Early return in labeled if-else such that it won't just be eliminated through DCE

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      return 20;
      break foo;
    } else {
      $(101);
      break foo;
    }
  }
  $('after');
}

f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    if ($(true)) {
      $(100);
      return 20;
      break foo;
    } else {
      $(101);
      break foo;
    }
  }
  $(`after`);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(100);
      return 20;
    } else {
      $(101);
      break foo;
    }
  }
  $(`after`);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(100);
} else {
  $(101);
  $(`after`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 100 );
}
else {
  $( 101 );
  $( "after" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
