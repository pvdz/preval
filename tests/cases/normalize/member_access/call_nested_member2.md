# Preval test case

# call_nested_member2.md

> Normalize > Member access > Call nested member2
>
> Calling a nested object structure should cache one level but not break the context

## Input

`````js filename=intro
const obj = {a: {b: () => $(1)}};
obj.a.b();
`````

## Pre Normal


`````js filename=intro
const obj = {
  a: {
    b: () => {
      debugger;
      return $(1);
    },
  },
};
obj.a.b();
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCallObj = obj.a;
tmpCallObj.b();
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal = { b: tmpObjLitVal$1 };
tmpObjLitVal.b();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  return b;
};
const c = { b: a };
c.b();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
