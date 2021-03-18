# Preval test case

# with_elsetail.md

> Ifelse > Label > With elsetail
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
    $('else');
  }
  $('after');
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
    $('else');
  }
  $('after');
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
    } else {
      $('else');
    }
  }
  $('after');
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
  } else {
    $('else');
  }
}
$('after');
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
