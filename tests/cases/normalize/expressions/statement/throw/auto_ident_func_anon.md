# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Statement > Throw > Auto ident func anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw function () {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw function () {
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
const tmpThrowArg /*:()=>*/ = function () {
  debugger;
  return undefined;
};
throw tmpThrowArg;
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
