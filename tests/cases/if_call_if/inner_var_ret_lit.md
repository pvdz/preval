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
const f = function () {
  debugger;
  const test = $(1);
  if (test) {
    $(100);
    return undefined;
  } else {
    $(2);
    $(100);
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
