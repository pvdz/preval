# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond simple simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = 1 ? 2 : $($(100)))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    tmpNestedComplexRhs = 2;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__pattern;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    a = 2;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
