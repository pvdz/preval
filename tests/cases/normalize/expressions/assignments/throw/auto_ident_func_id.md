# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Throw > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = function f() {});
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = function f() {
  debugger;
});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
};
a = f;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
};
throw f;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ function() {} ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
