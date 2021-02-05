# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > statement > param_default > auto_ident_cond_simple_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(arg = 1 ? $(2) : $($(100))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    if (1) {
      arg = $(2);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      arg = tmpCallCallee(tmpCalleeParam);
    }
  } else {
    arg = $tdz$__arg;
  }
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    arg = $(2);
  } else {
    arg = $tdz$__arg;
  }
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
