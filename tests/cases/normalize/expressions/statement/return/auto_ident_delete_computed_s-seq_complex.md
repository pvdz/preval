# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > statement > return > auto_ident_delete_computed_s-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return delete ($(1), $(2), x)[$("y")];
}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpDeleteCompObj = x;
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
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
