# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > return > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return delete $(x)[$("y")];
}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = $('y');
  const tmpReturnArg = delete tmpDeleteCompObj[tmpDeleteCompProp];
  return tmpReturnArg;
}
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: true
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
