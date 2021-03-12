# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $(1) ? 2 : $($(100))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      p = 2;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      p = tmpCallCallee(tmpCalleeParam);
    }
  } else {
    p = tmpParamDefault;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam = $(100);
      $(tmpCalleeParam);
    }
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
