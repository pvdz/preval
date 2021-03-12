# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { x: $(1), y: 2, z: $(3) })) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$1 = 2;
    const tmpObjLitVal$2 = $(3);
    const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__pattern;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$2 = $(3);
    const tmpNestedComplexRhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
    a = tmpNestedComplexRhs;
  }
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
 - 3: undefined
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
