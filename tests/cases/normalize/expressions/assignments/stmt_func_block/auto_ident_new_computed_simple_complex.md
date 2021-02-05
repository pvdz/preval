# Preval test case

# auto_ident_new_computed_simple_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_new_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = new b[$("$")](1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { $: $ };
    let a = { a: 999, b: 1000 };
    const tmpCompObj = b;
    const tmpCompProp = $('$');
    const tmpNewCallee = tmpCompObj[tmpCompProp];
    a = new tmpNewCallee(1);
    $(a);
  }
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
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  a = new tmpNewCallee(1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
