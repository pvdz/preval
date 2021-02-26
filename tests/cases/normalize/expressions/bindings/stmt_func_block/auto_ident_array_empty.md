# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident array empty
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = [];
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = [];
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const a = [];
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
