# Preval test case

# id_shadow_param2.md

> Normalize > Function > Expr > Id shadow param2
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r(r) {
  $(typeof r, 'a');
  return r;
};
const x = f(10);
$(x, typeof f, 'b');
`````

## Pre Normal


`````js filename=intro
const f = function r$1($$0) {
  let r$1 = $$0;
  debugger;
  $(typeof r$1, `a`);
  return r$1;
};
const x = f(10);
$(x, typeof f, `b`);
`````

## Normalized


`````js filename=intro
const r$1 = function ($$0) {
  let r$2 = $$0;
  debugger;
  const tmpCalleeParam = typeof r$2;
  $(tmpCalleeParam, `a`);
  return r$2;
};
const f = r$1;
const x = f(10);
const tmpCalleeParam$1 = x;
const tmpCalleeParam$3 = typeof f;
$(tmpCalleeParam$1, tmpCalleeParam$3, `b`);
`````

## Output


`````js filename=intro
$(`number`, `a`);
$(10, `function`, `b`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "number", "a" );
$( 10, "function", "b" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 'a'
 - 2: 10, 'function', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
