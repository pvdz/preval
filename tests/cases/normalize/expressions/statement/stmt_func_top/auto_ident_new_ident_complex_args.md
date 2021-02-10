# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > statement > stmt_func_top > auto_ident_new_ident_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  new $($(1), $(2));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: { a: '999', b: '1000' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
