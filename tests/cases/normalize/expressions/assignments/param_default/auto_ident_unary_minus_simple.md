# Preval test case

# auto_ident_unary_minus_simple.md

> normalize > expressions > assignments > param_default > auto_ident_unary_minus_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = -arg)) {}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = -arg;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = -arg;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: -1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
