# Preval test case

# _base_nested_both_with_tail.md

> Normalize > Branching > Single branching > Base nested both with tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    if ($(6)) {
      $(7);
    } else {
      $(8);
    }
    return $(9);
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
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    if ($(6)) {
      $(7);
    } else {
      $(8);
    }
    return $(9);
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
      $(3);
    } else {
      $(4);
    }
    const tmpReturnArg = $(5);
    return tmpReturnArg;
  } else {
    const tmpIfTest$3 = $(6);
    if (tmpIfTest$3) {
      $(7);
    } else {
      $(8);
    }
    const tmpReturnArg$1 = $(9);
    return tmpReturnArg$1;
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
      $(3);
    } else {
      $(4);
    }
    const tmpReturnArg = $(5);
    return tmpReturnArg;
  } else {
    const tmpIfTest$3 = $(6);
    if (tmpIfTest$3) {
      $(7);
    } else {
      $(8);
    }
    const tmpReturnArg$1 = $(9);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, `final`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    const c = $( 2 );
    if (c) {
      $( 3 );
    }
    else {
      $( 4 );
    }
    const d = $( 5 );
    return d;
  }
  else {
    const e = $( 6 );
    if (e) {
      $( 7 );
    }
    else {
      $( 8 );
    }
    const f = $( 9 );
    return f;
  }
};
const g = a();
$( g, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 5
 - 5: 5, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
