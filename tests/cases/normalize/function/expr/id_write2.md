# Preval test case

# id_write2.md

> Normalize > Function > Expr > Id write2
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const r = function () {
  debugger;
  r = 20;
  return r;
};
const f = r;
const x = f();
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = typeof f;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Pre Normal


`````js filename=intro
const r = function () {
  debugger;
  r = 20;
  return r;
};
const f = r;
const x = f();
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = typeof f;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Normalized


`````js filename=intro
const r = function () {
  debugger;
  r = 20;
  return r;
};
const f = r;
const x = f();
const tmpCallCallee = $;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = typeof f;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
throw `Preval: Cannot write to const binding \`r\``;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: Cannot write to const binding `r`";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
