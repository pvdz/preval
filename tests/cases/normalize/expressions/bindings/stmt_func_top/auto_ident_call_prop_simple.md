# Preval test case

# auto_ident_call_prop_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_call_prop_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = b.$(1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  let a = b.$(1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
