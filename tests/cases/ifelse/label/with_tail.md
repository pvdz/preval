# Preval test case

# with_tail.md

> Ifelse > Label > With tail
>
> whoa

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
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
  const tmpAfterLabel = function () {
    debugger;
    $(`after`);
    return undefined;
  };
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(100);
    const tmpReturnArg = tmpAfterLabel();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(100);
  $(`after`);
} else {
  $(`after`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 100 );
  $( "after" );
}
else {
  $( "after" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 100
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
