# Preval test case

# else_call_return_undefined.md

> If call if > Else call return undefined
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
      const r2 = h();
      return r2;
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
      const r2 = h();
      return r2;
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
      const r2 = h();
      return r2;
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
  const test = $(3);
  if (test) {
    const tmpClusterSSA_test = $(1);
    if (tmpClusterSSA_test) {
      $(2);
      $(4);
      return undefined;
    } else {
      $(4);
      return undefined;
    }
  } else {
    $(4);
    return undefined;
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
