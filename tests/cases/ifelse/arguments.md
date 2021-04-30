# Preval test case

# arguments.md

> Ifelse > Arguments
>
> Return this

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return arguments;
    }
  }
}
const obj = {f, foo: 10};
$(obj.f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpArgumentsAny = arguments;
  debugger;
  if ($(1)) {
    if ($(2)) {
      return tmpArgumentsAny;
    }
  }
};
const obj = { f: f, foo: 10 };
$(obj.f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpArgumentsAny = arguments;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      return tmpArgumentsAny;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const obj = { f: f, foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpArgumentsAny = arguments;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      return tmpArgumentsAny;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const obj = { f: f, foo: 10 };
const tmpCalleeParam = obj.f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
