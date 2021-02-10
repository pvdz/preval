# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > statement > param_default > auto_ident_logic_or_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(arg = $($(0)) || $($(2))) {}
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
      const tmpCalleeParam$1 = $(2);
      arg = tmpCallCallee$1(tmpCalleeParam$1);
    }
  } else {
    arg = $tdz$__arg;
  }
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
