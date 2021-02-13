# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > statement > return > auto_ident_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return $(1), $(2), $(x);
}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpReturnArg = $(x);
  return tmpReturnArg;
}
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpReturnArg = $(x);
  return tmpReturnArg;
}
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same