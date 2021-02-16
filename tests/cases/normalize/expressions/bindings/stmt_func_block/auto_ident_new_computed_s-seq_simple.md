# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_new_computed_s-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = new (1, 2, b)["$"](1);
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
    const tmpCompObj = b;
    const tmpNewCallee = tmpCompObj.$;
    let a = new tmpNewCallee(1);
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
  const tmpNewCallee = b.$;
  let a = new tmpNewCallee(1);
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
