# Preval test case

# auto_ident_call_prop_s-seq.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_call_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = (1, 2, b).$(1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCallObj = b;
  a = tmpCallObj.$(1);
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
  a = tmpCallObj.$(1);
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same