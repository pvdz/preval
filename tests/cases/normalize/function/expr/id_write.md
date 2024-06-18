# Preval test case

# id_write.md

> Normalize > Function > Expr > Id write
>
> Function recursion by referencing a function expr id

For this reason we must create a constant outside of the function and a local alias as let. The local alias should be eliminated if it has no writes.

## Input

`````js filename=intro
const f = function funcexprname() {
  funcexprname = 20; // This throws in strict mode because `funcexprname` is a constant.
  return funcexprname;
};
const x = f();
$(x, typeof f);
`````

## Pre Normal


`````js filename=intro
const f = function funcexprname() {
  debugger;
  funcexprname = 20;
  return funcexprname;
};
const x = f();
$(x, typeof f);
`````

## Normalized


`````js filename=intro
const funcexprname = function () {
  debugger;
  funcexprname = 20;
  return funcexprname;
};
const f = funcexprname;
const x = f();
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = typeof f;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
throw `Preval: Cannot write to const binding \`funcexprname\``;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: Cannot write to const binding `funcexprname`";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
