# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > statement > return > auto_ident_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (1, 2, $(b)).c;
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCompObj = $(b);
  const tmpReturnArg = tmpCompObj.c;
  return tmpReturnArg;
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
function f() {
  const tmpCompObj = $(b);
  const tmpReturnArg = tmpCompObj.c;
  return tmpReturnArg;
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
 - 2: 1
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same