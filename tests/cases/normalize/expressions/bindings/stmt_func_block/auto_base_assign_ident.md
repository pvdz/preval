# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > bindings > stmt_func_block > auto_base_assign_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = (b = $(2));
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = 1;
    b = $(2);
    let a = b;
    $(a, b);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    let b = 1;
    b = $(2);
    let a = b;
    $(a, b);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same