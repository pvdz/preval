# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > return > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
function f() {
  return (a = b = 2);
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f() {
  b = 2;
  a = 2;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
function f() {
  b = 2;
  a = 2;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same