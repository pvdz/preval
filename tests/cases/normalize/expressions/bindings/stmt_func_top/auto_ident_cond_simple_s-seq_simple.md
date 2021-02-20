# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident cond simple s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1 ? (40, 50, 60) : $($(100));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = undefined;
  a = 60;
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  $(60);
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
