# Preval test case

# base.md

> Ifelse > Label > Base
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
}

f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
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
  foo: {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(100);
      break foo;
    }
  }
};
f();
`````

## Output

`````js filename=intro
foo: {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(100);
    break foo;
  }
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
