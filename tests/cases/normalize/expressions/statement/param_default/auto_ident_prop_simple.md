# Preval test case

# auto_ident_prop_simple.md

> normalize > expressions > statement > param_default > auto_ident_prop_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(arg = b.c) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    arg = b.c;
  } else {
    arg = $tdz$__arg;
  }
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    arg = b.c;
  } else {
    arg = $tdz$__arg;
  }
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
