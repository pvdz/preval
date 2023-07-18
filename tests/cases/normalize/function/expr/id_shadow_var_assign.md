# Preval test case

# id_shadow_var_assign.md

> Normalize > Function > Expr > Id shadow var assign
>
> Function recursion by referencing a function expr id

#TODO

## Input

`````js filename=intro
const f = function r() {
  var r = 20; // Ignored. r is read-only but the write fails silently.
  r = 30;
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````

## Pre Normal

`````js filename=intro
const f = function r$1() {
  debugger;
  let r$1 = undefined;
  r$1 = 20;
  r$1 = 30;
  $(typeof r$1);
  return r$1;
};
const x = f();
$(x, typeof f);
`````

## Normalized

`````js filename=intro
const r$1 = function () {
  debugger;
  let r$2 = undefined;
  r$2 = 20;
  r$2 = 30;
  const tmpCallCallee = $;
  const tmpCalleeParam = typeof r$2;
  tmpCallCallee(tmpCalleeParam);
  return r$2;
};
const f = r$1;
const x = f();
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = x;
const tmpCalleeParam$3 = typeof f;
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
$(`number`);
$(30, `function`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "number" );
$( 30, "function" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: 30, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
