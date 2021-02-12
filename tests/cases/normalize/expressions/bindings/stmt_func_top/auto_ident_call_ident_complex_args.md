# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_call_ident_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = $($(1), $(2));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
function f() {
  let b = { $: $ };
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  let a = $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
