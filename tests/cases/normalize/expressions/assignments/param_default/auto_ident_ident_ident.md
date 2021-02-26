# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Param default > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
function f(p = (a = b = 2)) {}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    b = 2;
    let tmpNestedComplexRhs = b;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
};
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
const f = function ($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    b = 2;
    const tmpNestedComplexRhs = b;
    a = tmpNestedComplexRhs;
  }
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
