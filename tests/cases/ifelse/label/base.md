# Preval test case

# base.md

> Ifelse > Label > Base
>
> whoa

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      break foo;
    }
  }
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
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(100);
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(100);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 100 );
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
