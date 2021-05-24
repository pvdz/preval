# Preval test case

# call_expr_return.md

> If call if > Call expr return
>
> Debugging

#TODO

## Input

`````js filename=intro
const f = function () {
  const a = function () {
    $(100)
    return undefined;
  };
  let test = $(1);
  const b = function () {
    if (test) {
      test = '';
      a();
      return undefined;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    test = $(2);
    b();
    return undefined;
  } else {
    b();
    return undefined;
  }
};
$(f);
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const a = function () {
    debugger;
    $(100);
    return undefined;
  };
  let test = $(1);
  const b = function () {
    debugger;
    if (test) {
      test = '';
      a();
      return undefined;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    test = $(2);
    b();
    return undefined;
  } else {
    b();
    return undefined;
  }
};
$(f);
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const a = function () {
    debugger;
    $(100);
    return undefined;
  };
  let test = $(1);
  const b = function () {
    debugger;
    if (test) {
      test = '';
      a();
      return undefined;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    test = $(2);
    b();
    return undefined;
  } else {
    b();
    return undefined;
  }
};
$(f);
`````

## Output

`````js filename=intro
const a = function () {
  debugger;
  $(100);
  return undefined;
};
const f = function () {
  debugger;
  const test = $(1);
  if (test) {
    const tmpClusterSSA_test = $(2);
    if (tmpClusterSSA_test) {
      a();
      return undefined;
    } else {
      a();
      return undefined;
    }
  } else {
    a();
    return undefined;
  }
};
$(f);
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
