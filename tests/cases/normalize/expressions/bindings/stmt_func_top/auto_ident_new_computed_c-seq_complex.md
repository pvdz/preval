# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_new_computed_c-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = new (1, 2, $(b))[$("$")](1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  1;
  2;
  const tmpCompObj = $(b);
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  let a = new tmpNewCallee(1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { $: $ };
  const tmpCompObj = $(b);
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  let a = new tmpNewCallee(1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: {}
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
