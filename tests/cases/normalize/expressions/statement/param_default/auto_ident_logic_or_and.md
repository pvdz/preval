# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > param_default > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(arg = $($(0)) || ($($(1)) && $($(2)))) {}
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
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      arg = tmpCallCallee$1(tmpCalleeParam$1);
      if (arg) {
        const tmpCallCallee$2 = $;
        const tmpCalleeParam$2 = $(2);
        arg = tmpCallCallee$2(tmpCalleeParam$2);
      }
    }
  } else {
    arg = $tdz$__arg;
  }
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(0);
    arg = $(tmpCalleeParam);
    if (arg) {
    } else {
      const tmpCalleeParam$1 = $(1);
      arg = $(tmpCalleeParam$1);
      if (arg) {
        const tmpCalleeParam$2 = $(2);
        arg = $(tmpCalleeParam$2);
      }
    }
  } else {
    arg = $tdz$__arg;
  }
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
