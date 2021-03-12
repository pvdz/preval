# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = ++b);
}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = ++b);
};
let b = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpReturnArg = a;
  return tmpReturnArg;
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
