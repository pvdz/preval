# Preval test case

# inner_var_ret_lit.md

> If call if > Inner var ret lit
>
> Inner function has a var decl and returns a literal

Trying to hit an edge case

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
      var x = a();
      return 500;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    b();
    return undefined;
  } else {
    test = $(2);
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
    let x = undefined;
    if (test) {
      x = a();
      return 500;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    b();
    return undefined;
  } else {
    test = $(2);
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
    let x = undefined;
    if (test) {
      x = a();
      return 500;
    } else {
      a();
      return undefined;
    }
  };
  if (test) {
    b();
    return undefined;
  } else {
    test = $(2);
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
  const b = function () {
    debugger;
    if (tmpIfelseifelse) {
      a();
      return undefined;
    } else {
      a();
      return undefined;
    }
  };
  let tmpIfelseifelse = undefined;
  if (test) {
    tmpIfelseifelse = true;
    a();
    return undefined;
  } else {
    tmpIfelseifelse = $(2);
    b();
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