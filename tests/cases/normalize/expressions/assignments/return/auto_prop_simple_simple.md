# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Return > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = { b: $(1) });
}
$(f());
a.b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  const tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
