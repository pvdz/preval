# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Param default > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $(1) + $(2))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpBinBothLhs = $(1);
    const tmpBinBothRhs = $(2);
    const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function ($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpBinBothLhs = $(1);
    const tmpBinBothRhs = $(2);
    const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
    a = tmpNestedComplexRhs;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - 4: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
