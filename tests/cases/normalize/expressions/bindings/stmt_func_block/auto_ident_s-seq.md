# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = ($(1), $(2), x);
    $(a, x);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = 1;
  $(1);
  $(2);
  let a = x;
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  $(1, 1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
