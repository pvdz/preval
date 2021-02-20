# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic or simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = 0 || 2;
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = 0;
  if (a) {
  } else {
    a = 2;
  }
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = 0;
  if (a) {
  } else {
    a = 2;
  }
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
