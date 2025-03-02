# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Throw > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

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
  return undefined;
};
a = f;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
throw f;
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ function() {return undefined;} ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
