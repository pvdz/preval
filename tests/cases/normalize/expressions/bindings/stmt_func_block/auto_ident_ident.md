# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = b;
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 1;
  let a = b;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(1, 1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
