# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (1, 2, b)[$("c")]) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $('c');
    p = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
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
    const tmpAssignRhsCompProp = $('c');
    b[tmpAssignRhsCompProp];
  }
};
const b = { c: 1 };
const a = { a: 999, b: 1000 };
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
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
