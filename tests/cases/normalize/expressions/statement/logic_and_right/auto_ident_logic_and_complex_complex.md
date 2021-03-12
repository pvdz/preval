# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && $($(1)) && $($(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && $($(1)) && $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpCallCallee$1(tmpCalleeParam$1);
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  const SSA_tmpIfTest = $(tmpCalleeParam);
  if (SSA_tmpIfTest) {
    const tmpCalleeParam$1 = $(2);
    $(tmpCalleeParam$1);
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
