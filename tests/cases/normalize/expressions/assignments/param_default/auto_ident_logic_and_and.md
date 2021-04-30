# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $($(1)) && $($(1)) && $($(2))) : tmpParamBare;
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
    const tmpCalleeParam = $(1);
    let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpNestedComplexRhs) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
      } else {
      }
    } else {
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
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
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = $(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCalleeParam$1 = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
const tmpSSA_a = tmpNestedComplexRhs;
$(undefined);
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
