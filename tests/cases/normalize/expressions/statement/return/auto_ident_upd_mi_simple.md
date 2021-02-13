# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > statement > return > auto_ident_upd_mi_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return --b;
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  b = b - 1;
  let tmpReturnArg = b;
  return tmpReturnArg;
}
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  b = b - 1;
  let tmpReturnArg = b;
  return tmpReturnArg;
}
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same