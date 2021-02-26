# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = (1, 2, $(b))[$("c")])) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    const tmpCompProp = $('c');
    const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
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
const f = function ($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    const tmpCompProp = $('c');
    const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
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
 - 1: { c: '1' }
 - 2: 'c'
 - 3: undefined
 - 4: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
