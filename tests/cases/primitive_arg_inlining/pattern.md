# Preval test case

# pattern.md

> Primitive arg inlining > Pattern
>
> This is roughly what patterns dissolve into

#TODO

## Input

`````js filename=intro
function f(op) {
  let ap = undefined;
  const useDef = op === undefined;
  if (useDef) {
    const p = { a: 'fail' };
    ap = $(p);
  } else {
    ap = op;
  }
  const tmpCalleeParam$2 = [];
  let x = objPatternRest(ap, tmpCalleeParam$2, undefined);
  return x;
}
const out = f('abc');
$(out);
`````

## Normalized

`````js filename=intro
let f = function (op) {
  let ap = undefined;
  const useDef = op === undefined;
  if (useDef) {
    const p = { a: 'fail' };
    ap = $(p);
  } else {
    ap = op;
  }
  const tmpCalleeParam$2 = [];
  let x = objPatternRest(ap, tmpCalleeParam$2, undefined);
  return x;
};
const out = f('abc');
$(out);
`````

## Output

`````js filename=intro
const f = function (op) {
  let ap = undefined;
  const useDef = op === undefined;
  if (useDef) {
    const p = { a: 'fail' };
    ap = $(p);
  } else {
    ap = op;
  }
  const tmpCalleeParam$2 = [];
  const x = objPatternRest(ap, tmpCalleeParam$2, undefined);
  return x;
};
const out = f('abc');
$(out);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
