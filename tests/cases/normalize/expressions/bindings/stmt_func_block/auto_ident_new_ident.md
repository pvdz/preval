# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident new ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = new $(1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = new $(1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const a = new $(1);
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
