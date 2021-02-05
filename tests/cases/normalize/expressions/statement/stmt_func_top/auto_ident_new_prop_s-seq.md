# Preval test case

# auto_ident_new_prop_s-seq.md

> normalize > expressions > statement > stmt_func_top > auto_ident_new_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  new (1, 2, b).$(1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  1;
  2;
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
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
  let a = { a: 999, b: 1000 };
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
