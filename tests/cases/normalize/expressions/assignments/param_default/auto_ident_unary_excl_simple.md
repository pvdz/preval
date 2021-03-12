# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = !arg)) {}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = !arg;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__pattern;
  }
};
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    a = false;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: false, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
