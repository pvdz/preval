# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > If > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = function f() {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
if (
  (a = function f() {
    debugger;
  })
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
};
a = f;
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
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
