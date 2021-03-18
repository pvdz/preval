# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident unary complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;

  let a = typeof $(x);
  $(a, x);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let x = 1;
  let a = typeof $(x);
  $(a, x);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = 1;
  const tmpUnaryArg = $(x);
  let a = typeof tmpUnaryArg;
  $(a, x);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$(a, 1);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
