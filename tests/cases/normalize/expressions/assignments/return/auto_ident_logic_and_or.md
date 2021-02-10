# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > assignments > return > auto_ident_logic_and_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = ($($(1)) && $($(1))) || $($(2)));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
  }
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
