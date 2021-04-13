# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Throw > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw () => {};
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw () => {
  debugger;
};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = function () {
  debugger;
  return undefined;
};
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpThrowArg = function () {
  debugger;
  return undefined;
};
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ function() {return undefined;} ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
