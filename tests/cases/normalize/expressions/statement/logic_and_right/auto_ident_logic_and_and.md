# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Logic and right > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && $($(1)) && $($(1)) && $($(2));
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
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpCallCallee$2(tmpCalleeParam$2);
    }
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
    const tmpCalleeParam$1 = $(1);
    const SSA_tmpIfTest$1 = $(tmpCalleeParam$1);
    if (SSA_tmpIfTest$1) {
      const tmpCalleeParam$2 = $(2);
      $(tmpCalleeParam$2);
    }
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
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
