# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Return > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (1, 2, b)[$("c")];
}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (1, 2, b)[$('c')];
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  const tmpReturnArg = tmpCompObj[tmpCompProp];
  return tmpReturnArg;
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
const f = function () {
  const tmpCompProp = $('c');
  const tmpReturnArg = b[tmpCompProp];
  return tmpReturnArg;
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
 - 2: 1
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
