# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || $($(1)) || $($(2))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $($(0)) || $($(1)) || $($(2)) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    p = tmpCallCallee(tmpCalleeParam);
    if (p) {
      return undefined;
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      p = tmpCallCallee$1(tmpCalleeParam$1);
      if (p) {
        return undefined;
      } else {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        p = tmpCallCallee$3(tmpCalleeParam$3);
        return undefined;
      }
    }
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const tmpSSA_p = $(tmpCalleeParam);
  if (tmpSSA_p) {
    return undefined;
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpSSA_p$1 = $(tmpCalleeParam$1);
    if (tmpSSA_p$1) {
      return undefined;
    } else {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
      return undefined;
    }
  }
};
const a = { a: 999, b: 1000 };
f();
$(undefined);
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
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
