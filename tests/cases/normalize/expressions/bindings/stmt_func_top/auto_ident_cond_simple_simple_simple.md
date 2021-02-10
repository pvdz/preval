# Preval test case

# auto_ident_cond_simple_simple_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_cond_simple_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1 ? 2 : $($(100));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = undefined;
  {
    a = 2;
  }
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
