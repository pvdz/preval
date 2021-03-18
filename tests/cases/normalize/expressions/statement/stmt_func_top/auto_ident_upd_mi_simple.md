# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = { a: 999, b: 1000 };
  --b;
  $(a, b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = 1;
  let a = { a: 999, b: 1000 };
  --b;
  $(a, b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = 1;
  let a = { a: 999, b: 1000 };
  b = b - 1;
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a, 0);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
