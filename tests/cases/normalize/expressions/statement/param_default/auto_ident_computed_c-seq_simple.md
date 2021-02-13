# Preval test case

# auto_ident_computed_c-seq_simple.md

> normalize > expressions > statement > param_default > auto_ident_computed_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (1, 2, $(b))[$("c")]) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpAssignRhsCompObj = $(b);
    const tmpAssignRhsCompProp = $('c');
    p = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  } else {
    p = $tdz$__p;
  }
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpAssignRhsCompObj = $(b);
    const tmpAssignRhsCompProp = $('c');
    p = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  } else {
    p = $tdz$__p;
  }
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: undefined
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same