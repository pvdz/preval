# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = { y: 1 };

  let a = { a: 999, b: 1000 };
  a = delete ($(1), $(2), x).y;
  $(a, x);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = { y: 1 };
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  const tmpDeleteObj = x;
  a = delete tmpDeleteObj.y;
  $(a, x);
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
 - 2: 2
 - 3: true, {}
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
