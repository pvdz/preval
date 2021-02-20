# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident call computed complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = $(b)["$"](1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  const tmpCallObj = $(b);
  let a = tmpCallObj.$(1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const b = { $: $ };
  const tmpCallObj = $(b);
  const a = tmpCallObj.$(1);
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
