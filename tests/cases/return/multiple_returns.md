# Preval test case

# multiple_returns.md

> Return > Multiple returns
>
> After normalization it's no longer implicit

#TODO

## Input

`````js filename=intro
function f() {
  if ($(true)) {
    $(1);
    if ($(true)) {
      $(2);
      return 10;
    }
    if ($(true)) {
      $(3);
      if ($(true)) {
        $(4);
        if ($(true)) {
          $(5);
          return 10;
        }
        return 10;
      }
      return 10;
    }
    return 10;
  }
  return 10;
}
$(f());
$(f());
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    $(1);
    if ($(true)) {
      $(2);
      return 10;
    }
    if ($(true)) {
      $(3);
      if ($(true)) {
        $(4);
        if ($(true)) {
          $(5);
          return 10;
        }
        return 10;
      }
      return 10;
    }
    return 10;
  }
  return 10;
};
$(f());
$(f());
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(1);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(2);
      return 10;
    } else {
      const tmpIfTest$3 = $(true);
      if (tmpIfTest$3) {
        $(3);
        const tmpIfTest$5 = $(true);
        if (tmpIfTest$5) {
          $(4);
          const tmpIfTest$7 = $(true);
          if (tmpIfTest$7) {
            $(5);
            return 10;
          } else {
            return 10;
          }
        } else {
          return 10;
        }
      } else {
        return 10;
      }
    }
  } else {
    return 10;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(1);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(2);
      return undefined;
    } else {
      const tmpIfTest$3 = $(true);
      if (tmpIfTest$3) {
        $(3);
        const tmpIfTest$5 = $(true);
        if (tmpIfTest$5) {
          $(4);
          const tmpIfTest$7 = $(true);
          if (tmpIfTest$7) {
            $(5);
            return undefined;
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
  } else {
    return undefined;
  }
};
f();
$(10);
f();
$(10);
f();
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( true );
  if (b) {
    $( 1 );
    const c = $( true );
    if (c) {
      $( 2 );
      return undefined;
    }
    else {
      const d = $( true );
      if (d) {
        $( 3 );
        const e = $( true );
        if (e) {
          $( 4 );
          const f = $( true );
          if (f) {
            $( 5 );
            return undefined;
          }
          else {
            return undefined;
          }
        }
        else {
          return undefined;
        }
      }
      else {
        return undefined;
      }
    }
  }
  else {
    return undefined;
  }
},;
a();
$( 10 );
a();
$( 10 );
a();
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: true
 - 4: 2
 - 5: 10
 - 6: true
 - 7: 1
 - 8: true
 - 9: 2
 - 10: 10
 - 11: true
 - 12: 1
 - 13: true
 - 14: 2
 - 15: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
