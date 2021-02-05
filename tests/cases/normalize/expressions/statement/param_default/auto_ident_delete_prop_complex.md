# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > statement > param_default > auto_ident_delete_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
function f(arg = delete $(x).y) {}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpDeleteObj = $(x);
    arg = delete tmpDeleteObj.y;
  } else {
    arg = $tdz$__arg;
  }
}
let x = { y: 1 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpDeleteObj = $(x);
    arg = delete tmpDeleteObj.y;
  } else {
    arg = $tdz$__arg;
  }
}
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: undefined
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
