# Preval test case

# id_write.md

> Normalize > Function > Expr > Id write
>
> Function recursion by referencing a function expr id

For this reason we must create a constant outside of the function and a local alias as let. The local alias should be eliminated if it has no writes.

#TODO

## Input

`````js filename=intro
const f = function r() {
  r = 20; // Ignored. r is read-only but the write fails silently.
  return r;
};
const x = f();
$(x, typeof f);
`````

## Pre Normal

`````js filename=intro
const f = function r() {
  debugger;
  r = 20;
  return r;
};
const x = f();
$(x, typeof f);
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
const r = function () {
  debugger;
  r = 20;
  return r;
};
const x = r();
const tmpCalleeParam$1 = typeof r;
$(x, tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
