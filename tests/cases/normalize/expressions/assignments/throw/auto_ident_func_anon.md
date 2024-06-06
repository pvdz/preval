# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Throw > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = function () {});
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = function () {
  debugger;
});
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const a = function () {
  debugger;
  return undefined;
};
throw a;
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
