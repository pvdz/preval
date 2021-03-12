# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || ($($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? $($(0)) || ($($(1)) && $($(2))) : tmpParamDefault;
};
let a = { a: 999, b: 1000 };
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
      const tmpCalleeParam$1 = $(1);
      p = tmpCallCallee$1(tmpCalleeParam$1);
      if (p) {
        const tmpCallCallee$2 = $;
        const tmpCalleeParam$2 = $(2);
        p = tmpCallCallee$2(tmpCalleeParam$2);
      }
    }
  } else {
    p = tmpParamDefault;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
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
      const tmpCalleeParam$1 = $(1);
      const SSA_p$1 = $(tmpCalleeParam$1);
      if (SSA_p$1) {
        const tmpCalleeParam$2 = $(2);
        $(tmpCalleeParam$2);
      }
    }
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````

## Globals

None

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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
