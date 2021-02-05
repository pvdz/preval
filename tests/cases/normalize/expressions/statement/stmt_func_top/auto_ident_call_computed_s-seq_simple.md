# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> normalize > expressions > statement > stmt_func_top > auto_ident_call_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  (1, 2, b)["$"](1);
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
  const tmpCallObj = b;
  tmpCallObj['$'](1);
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
  const tmpCallObj = b;
  tmpCallObj.$(1);
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
