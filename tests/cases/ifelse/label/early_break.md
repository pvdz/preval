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
  const tmpBranchingC = function () {
    $('after');
  };
  const tmpLabeledBlockFunc = function () {
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(100);
      const tmpReturnArg = tmpBranchingC();
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    }
  };
  const tmpReturnArg$2 = tmpLabeledBlockFunc();
  return tmpReturnArg$2;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $(100);
  $('after');
} else {
  $('after');
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
