# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > assignments > param_default > auto_ident_logic_and_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(arg = (a = $($(1)) && $($(1)) && $($(2)))) {}
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
    const tmpCalleeParam = $(1);
    let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    }
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
    }
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
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
'<skipped>';
`````

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

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
