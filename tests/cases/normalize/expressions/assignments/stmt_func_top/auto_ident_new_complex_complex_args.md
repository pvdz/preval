# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_new_complex_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = new ($($))($(1), $(2));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
