# Preval test case

# early_return.md

> Ifelse > Label > Early return
>
> The label gets eliminated because DCE removes all usages of the label so it's removed

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      return 20;
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
    }
  }
  $(`after`);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(100);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
