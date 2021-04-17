# Preval test case

# back2back_bad_because.md

> Ssa > Back2back bad because
>
> This may be an artifact through using ++x

We can't SSA here because renaming the x means the closure breaks.

This is _the_ example case that shows why we have to be careful about read-var-write cases.

The closure is called before the second write and we can't (trivially) tell to which binding the closure should point after the SSA; the old or the new.

Now what happens if the function is called in the second assignment (when it needs to point to the old) and after that assignment (when it needs to point to the new)? Oops.

We can't apply SSA to this with our current heuristics.

We could clone the function with a before and after variation. But that feels like it would only solve a very niche case, not a general solution. And it would fail fast if we can't track the function in the first place. Like what happens when it's a class method, etc.

#TODO

## Input

`````js filename=intro
function f() {
  if ($) {
    const g = function(){ if ($) return $(x); };
    let x = $(5);
    x = g(); // Here g needs to point to the "old" binding if we would apply SSA.
    g(); // And here g needs to point to the "new" binding if we would apply SSA.
    $(x);
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) return $(x);
    };
    let x = $(5);
    x = g();
    g();
    $(x);
  }
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        const tmpReturnArg = $(x);
        return tmpReturnArg;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    x = g();
    g();
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        const tmpReturnArg = $(x);
        return tmpReturnArg;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    x = g();
    g();
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 5
 - 4: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
