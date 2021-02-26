# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary excl complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = !$(100);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpUnaryArg = $(100);
  let a = !tmpUnaryArg;
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpUnaryArg = $(100);
  const a = !tmpUnaryArg;
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
