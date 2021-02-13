# Preval test case

# auto_ident_computed_complex_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = $(b)[$("c")];
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 1 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('c');
  let a = tmpCompObj[tmpCompProp];
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { c: 1 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('c');
  let a = tmpCompObj[tmpCompProp];
  $(a, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same