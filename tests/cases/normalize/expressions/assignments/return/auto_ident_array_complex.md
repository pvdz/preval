# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = [$(1), 2, $(3)]);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$2 = $(3);
  a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpArrElement = $(1);
  const tmpArrElement$2 = $(3);
  a = [tmpArrElement, 2, tmpArrElement$2];
  const tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
