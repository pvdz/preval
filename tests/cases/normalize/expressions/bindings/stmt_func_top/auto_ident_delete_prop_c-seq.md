# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_delete_prop_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = { y: 1 };

  let a = delete ($(1), $(2), $(arg)).y;
  $(a, x);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  let a = delete tmpDeleteObj.y;
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  let a = delete tmpDeleteObj.y;
  $(a, x);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true, undefined
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same