# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = { a: 999, b: 1000 };
    a = typeof $(arg);
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let arg = 1;
  let a = { a: 999, b: 1000 };
  const tmpUnaryArg = $(arg);
  a = typeof tmpUnaryArg;
  $(a, arg);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpUnaryArg = $(1);
  const SSA_a = typeof tmpUnaryArg;
  $(SSA_a, 1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
