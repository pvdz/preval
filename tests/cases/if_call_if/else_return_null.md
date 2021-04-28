# Preval test case

# else_return_null.md

> If call if > Else return null
>
> Debugging

#TODO

## Input

`````js filename=intro
const f = function () {
  const h = function () {
    $(4)
  };
  let test = $(3);
  const k = function () {
    if (test) {
      test = $(2);
      const r1 = h();
      return r1;
    } else {
      return null;
    }
  };
  if (test) {
    test = $(1)
    const r3 = k();
    return r3;
  } else {
    const r4 = k();
    return r4;
  }
};
if ($) $(f);
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const h = function () {
    debugger;
    $(4);
  };
  let test = $(3);
  const k = function () {
    debugger;
    if (test) {
      test = $(2);
      const r1 = h();
      return r1;
    } else {
      return null;
    }
  };
  if (test) {
    test = $(1);
    const r3 = k();
    return r3;
  } else {
    const r4 = k();
    return r4;
  }
};
if ($) $(f);
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const h = function () {
    debugger;
    $(4);
    return undefined;
  };
  let test = $(3);
  const k = function () {
    debugger;
    if (test) {
      test = $(2);
      const r1 = h();
      return r1;
    } else {
      return null;
    }
  };
  if (test) {
    test = $(1);
    const r3 = k();
    return r3;
  } else {
    const r4 = k();
    return r4;
  }
};
if ($) {
  $(f);
} else {
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let test = $(3);
  const k = function () {
    debugger;
    if (test) {
      test = $(2);
      $(4);
      return undefined;
    } else {
      return null;
    }
  };
  if (test) {
    test = $(1);
    const r3 = k();
    return r3;
  } else {
    return null;
  }
};
if ($) {
  $(f);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same