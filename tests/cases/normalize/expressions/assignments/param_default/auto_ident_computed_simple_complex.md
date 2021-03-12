# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = b[$("c")])) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCompObj = b;
    const tmpCompProp = $('c');
    const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__pattern;
  }
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCompProp = $('c');
    const tmpNestedComplexRhs = b[tmpCompProp];
    a = tmpNestedComplexRhs;
  }
};
const b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: undefined
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
