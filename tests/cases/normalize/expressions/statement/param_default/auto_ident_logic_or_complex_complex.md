# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || $($(2))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    p = tmpCallCallee(tmpCalleeParam);
    if (p) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      p = tmpCallCallee$1(tmpCalleeParam$1);
    }
  } else {
    p = tmpParamDefault;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(0);
    const SSA_p = $(tmpCalleeParam);
    if (SSA_p) {
    } else {
      const tmpCalleeParam$1 = $(2);
      $(tmpCalleeParam$1);
    }
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Globals

None

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

Final output calls: Same
