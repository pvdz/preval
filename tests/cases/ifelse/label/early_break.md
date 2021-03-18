# Preval test case

# early_break.md

> Ifelse > Label > Early break
>
> 

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      break foo;
      $('fail');
    }
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
      $('fail');
    }
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
