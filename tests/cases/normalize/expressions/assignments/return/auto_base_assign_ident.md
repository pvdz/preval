# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Return > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = b = $(2));
}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = b = $(2));
};
let b = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpNestedComplexRhs = $(2);
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
  const tmpNestedComplexRhs = $(2);
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
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
