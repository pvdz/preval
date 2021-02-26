# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary typeof simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = typeof arg;
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let arg = 1;
  let a = typeof arg;
  $(a, arg);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $('number', 1);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
