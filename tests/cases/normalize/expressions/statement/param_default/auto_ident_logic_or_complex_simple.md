# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > param_default > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(arg = $($(0)) || 2) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    arg = tmpCallCallee(tmpCalleeParam);
    if (arg) {
    } else {
      arg = 2;
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
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    arg = tmpCallCallee(tmpCalleeParam);
    if (arg) {
    } else {
      arg = 2;
    }
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
 - 1: 0
 - 2: 0
 - 3: undefined
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
