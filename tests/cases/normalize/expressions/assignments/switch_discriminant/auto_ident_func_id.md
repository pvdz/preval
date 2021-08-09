# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = function f() {})) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = function f() {
    debugger;
  });
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
$(100);
$(f);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
