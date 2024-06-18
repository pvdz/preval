# Preval test case

# double_write.md

> If call if > Double write
>
> This variation of the pattern has a write in both else cases, making the first write unobservable

## SKIP

Not implemented yet

## Input

`````js filename=intro
function f() {
  let test = $(0);
  const h = function() {
    if ($) $(test);
  }
  const g = function () {
    debugger;
    if (test) {
      const r1 = h();
      return r1;
    } else {
      test = 'known';
      const r2 = h();
      return r2;
    }
  };
  if (test) {
    test = $(1);
    const r3 = g();
    return r3;
  } else {
    // This write is unobservable since the `else` branch in `g` will set it and the `if` test cannot be observed.
    // In other words; this write can be eliminated. What's a little more relevant is that this means we can replace
    // the next three statements by the `else` in `g`, since it would not violate statement bloat; 3 for 3 statements. 
    test = false;      // This becomes test='known'
    const r4 = g();    // This becomes a call to `h`
    return r4;
  }
};
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let test = $(0);
  const h = function () {
    debugger;
    if ($) $(test);
  };
  const g = function () {
    debugger;
    if (test) {
      const r1 = h();
      return r1;
    } else {
      test = 'known';
      const r2 = h();
      return r2;
    }
  };
  if (test) {
    test = $(1);
    const r3 = g();
    return r3;
  } else {
    test = false;
    const r4 = g();
    return r4;
  }
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let test = $(0);
  const h = function () {
    debugger;
    if ($) {
      $(test);
      return undefined;
    } else {
      return undefined;
    }
  };
  const g = function () {
    debugger;
    if (test) {
      const r1 = h();
      return r1;
    } else {
      test = 'known';
      const r2 = h();
      return r2;
    }
  };
  if (test) {
    test = $(1);
    const r3 = g();
    return r3;
  } else {
    test = false;
    const r4 = g();
    return r4;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let test = $(0);
  const h = function () {
    debugger;
    if ($) {
      $(test);
      return undefined;
    } else {
      return undefined;
    }
  };
  const g = function () {
    debugger;
    if (test) {
      h();
      return undefined;
    } else {
      test = 'known';
      h();
      return undefined;
    }
  };
  if (test) {
    test = $(1);
    g();
    return undefined;
  } else {
    test = false;
    g();
    return undefined;
  }
};
if ($) {
  f();
  $(undefined);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'known'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
