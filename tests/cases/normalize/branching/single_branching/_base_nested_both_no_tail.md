# Preval test case

# _base_nested_both_no_tail.md

> Normalize > Branching > Single branching > Base nested both no tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    if ($(5)) {
      return $(6);
    } else {
      return $(7);
    }
  }
}
$(f(), 'final');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    if ($(5)) {
      return $(6);
    } else {
      return $(7);
    }
  }
};
$(f(), `final`);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = $(4);
      return tmpReturnArg$1;
    }
  } else {
    const tmpIfTest$3 = $(5);
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = $(6);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = $(7);
      return tmpReturnArg$5;
    }
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = `final`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = $(4);
      return tmpReturnArg$1;
    }
  } else {
    const tmpIfTest$3 = $(5);
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = $(6);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = $(7);
      return tmpReturnArg$5;
    }
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, `final`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
